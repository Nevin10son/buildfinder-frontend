import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SideBar from './SideBar';

const ClientSeeQaA = () => {
    const [questions, setQuestions] = useState([]); // Store questions
    const [input,setInput] = useState({"ClientId":sessionStorage.getItem("userid")})

        // Fetch the questions asked by the logged-in client
        const fetchMyQuestions = () => {
            axios.post(
                "http://localhost:8000/seeAnswers", 
                input, 
                {
                    headers: {
                        token: sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                }
                
            ).then((response) => {
                if (response.data.Status === "Success") {
                    setQuestions(response.data.questions); // Store the questions
                } else {
                    console.error("Error:", response.data.Status);
                }
            }).catch((error) => {
                console.error("API Error:", error);
            });
        };

            // Fetch the questions on component mount
    useEffect(() => {
        fetchMyQuestions()
    }, [])
  return ( 
    <div>
        <SideBar/>
      <div className="container">
            <h2>My Questions</h2>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question._id} className="question-card">
                        <p><b>Question:</b> {question.question}</p>
                        <h4>Answers:</h4>
                        {question.answers.length > 0 ? (
                            question.answers.map((answer) => (
                                <div key={answer._id}>
                                    <p><b>Answered By:</b> {answer.professionalId?.name}</p>
                                    <p>{answer.answer}</p>
                                    <p>
                                        <small>
                                            Answered At: {new Date(answer.answerAt).toLocaleString()}
                                        </small>
                                    </p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No answers yet.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>You haven't asked any questions yet.</p>
            )}
    </div>
    </div>
  )
}

export default ClientSeeQaA
