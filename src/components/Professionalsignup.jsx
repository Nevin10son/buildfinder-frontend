import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Professionalsignup.css';

const Professionalsignup = () => {
    const [input, setInput] = useState({
        name: "",
        dob: "",
        emailid: "",
        password: "",
        cpassword: "",
        mobileno: "",
        gender: ""
    });

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        if (input.password === input.cpassword) {
            const newinput = {
                name: input.name,
                dob: input.dob,
                emailid: input.emailid,
                password: input.password,
                mobileno: input.mobileno,
                gender: input.gender
            };

            axios.post("http://localhost:8000/buildersSignup", newinput)
                .then((response) => {
                    if (response.data.Status === "Success") {
                        alert("Registered Successfully");
                        setInput({
                            name: "",
                            dob: "",
                            emailid: "",
                            password: "",
                            cpassword: "",
                            mobileno: "",
                            gender: ""
                        });
                    } else if (response.data.Error === "email id already exist") {
                        alert("Email is already exist");
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
            <h1 className="signup-title">Professional Sign Up</h1>
            <div className="signup-form">
                {["name", "dob", "emailid", "password", "cpassword", "mobileno", "gender"].map((field, idx) => (
                    <div className="form-group" key={idx}>
                        <input
                            type={field === "dob" ? "date" : field.includes("password") ? "password" : field === "mobileno" ? "tel" : "text"}
                            name={field}
                            value={input[field]}
                            onChange={inputHandler}
                            className="signup-input"
                            placeholder=" "
                            required
                        />
                        <label className="floating-label">
                            {field === "cpassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                    </div>
                ))}
                <button onClick={readValue} className="signup-button">Register</button>
                <Link to="/professionallogin" className="signup-link">Login</Link>
            </div>
        </div>
    );
};

export default Professionalsignup;
