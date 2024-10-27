import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import './AdminQaA.css';

const AdminQaA = () => {
    const [datas, setData] = useState([]);
    const [input, setInput] = useState({"field": sessionStorage.getItem("field")});
    const [answer, setAnswer] = useState({});

    const fetchData = () => {
        axios.post("http://localhost:8000/getQuestions", input, {
            headers: {
                "token": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const inputHandler = (event, questionId) => {
        setAnswer(prevState => ({
            ...prevState,
            [questionId]: event.target.value
        }));
    };

    const submitAnswer = (questionId) => {
        const answerPayload = {
            questionId: questionId,
            ProfessionalId: sessionStorage.getItem("userId"),
            answer: answer[questionId]
        };

        axios.post("http://localhost:8000/setAnswer", answerPayload, {
            headers: {
                token: sessionStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            fetchData(); // Optionally refresh the questions list
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin-qa-container">
            <Navbar />
            {datas.map((value, index) => (
                <div key={index} className="qa-item">
                    <div className="qa-header">
                        <p><strong>Client:</strong> {value.ClientId?.name || 'Anonymous'}</p>
                        <h4>{value.question}</h4>
                    </div>
                    <textarea
                        placeholder="Type your answer here"
                        onChange={(e) => inputHandler(e, value._id)}
                        value={answer[value._id] || ''}
                        className="qa-textarea"
                    ></textarea>
                    <button className="qa-submit-button" onClick={() => submitAnswer(value._id)}>
                        Submit
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminQaA;
