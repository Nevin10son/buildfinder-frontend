import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ClientSignup.css';

const ClientSignup = () => {
    const [input, setInput] = useState({
        name: "",
        mobileno: "",
        emailid: "",
        password: "",
        cpassword: "",
        location: ""
    });

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        if (input.password === input.cpassword) {
            const newinput = {
                name: input.name,
                mobileno: input.mobileno,
                emailid: input.emailid,
                password: input.password,
                location: input.location
            };
            axios.post("http://localhost:8000/clientsignup", newinput)
                .then((response) => {
                    if (response.data.Status === "Email id already existing") {
                        alert("Email already used");
                    } else if (response.data.Status === "Success") {
                        alert("Registered Successfully");
                        setInput({
                            name: "",
                            mobileno: "",
                            emailid: "",
                            password: "",
                            cpassword: "",
                            location: ""
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            alert("The password doesn't match");
        }
    };

    return (
        <div className="signup-container">
            <header className="signup-header">
                <h2>Sign Up</h2>
            </header>
            <h1 className="signup-title">Client Sign Up</h1>
            <div className="signup-form">
                {["name", "mobileno", "emailid", "password", "cpassword", "location"].map((field, idx) => (
                    <div className="form-group" key={idx}>
                        <input 
                            type={field.includes("password") ? "password" : field === "emailid" ? "email" : field === "mobileno" ? "tel" : "text"}
                            name={field}
                            value={input[field]}
                            onChange={inputHandler}
                            className="signup-input"
                            required
                            placeholder=" " // Adds a blank placeholder for the floating label effect
                        />
                        <label className="floating-label">{field === "cpassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    </div>
                ))}
                <button onClick={readValue} className="signup-button">Register</button>
                <Link to="/clientlogin" className="signup-link">Already have an account? Login</Link>
            </div>
        </div>
    );
};

export default ClientSignup;
