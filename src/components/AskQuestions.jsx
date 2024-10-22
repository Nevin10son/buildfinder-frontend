import axios from 'axios'
import React, { useState } from 'react'
import SideBar from './SideBar'
import './AddQuestions.css'

const AskQuestions = () => {
    const [input, setInput] = useState({
        ClientId: sessionStorage.getItem('userid'),
        field: '',
        question: ''
    });

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(input);
        axios
            .post(
                'http://localhost:8000/askQuestion',
                input,
                {
                    headers: {
                        token: sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                console.log(response.data);
                if (response.data.Status === 'Success') {
                    alert('Question Submitted Successfully');
                } else {
                    alert('An error Occurred');
                }
            });
    };

    return (
        <div className="ask-questions-container">
            <SideBar /> {/* Sidebar component */}
            <div className="ask-questions-content">
                <h1 className="ask-questions-title">Clients can ask Questions here to the professionals</h1>
                
                <div className="ask-questions-form">
                    <label htmlFor="field" className="form-label">Field:</label>
                    <input 
                        type="text" 
                        name="field" 
                        value={input.field} 
                        onChange={inputHandler} 
                        className="form-input"
                    />
                    
                    <label htmlFor="question" className="form-label">Ask Your Question here:</label>
                    <textarea 
                        name="question" 
                        value={input.question} 
                        onChange={inputHandler} 
                        className="form-textarea"
                    ></textarea>
                    
                    <button onClick={readValue} className="form-submit-button">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default AskQuestions
