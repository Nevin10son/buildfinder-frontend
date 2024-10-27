import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './ProfessionalSignin.css';

const ProfessionalSignin = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ emailid: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const readValue = () => {
        axios.post("http://localhost:8000/builderSignin", input).then(
            (response) => {
                if (response.data.Status === "Invalid Username") {
                    alert("Username not found");
                } else if (response.data.Status === "Incorrect Password") {
                    alert("Incorrect password");
                } else {
                    let token = response.data.token;
                    let userId = response.data.userid;
                    let profilepage = response.data.profileCreated;
                    let field = response.data.field;

                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("userId", userId);
                    sessionStorage.setItem("field", field);

                    navigate(profilepage ? "/professionaldashboard" : "/profilecreation");
                }
            }
        );
    };

    return (
        <div className="signin-container">
            <h1 className="signin-title">Professional Sign In</h1>
            <div className="signin-form">
                <div className="form-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="email"
                        name="emailid"
                        value={input.emailid}
                        onChange={inputHandler}
                        className="signin-input"
                        placeholder=" "
                        required
                    />
                    <label className="floating-label">Email ID</label>
                </div>
                <div className="form-group">
                    <FaLock className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={input.password}
                        onChange={inputHandler}
                        className="signin-input"
                        placeholder=" "
                        required
                    />
                    <label className="floating-label">Password</label>
                    <span
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button onClick={readValue} className="signin-button">Login</button>
                <Link to="/professionalsignup" className="signin-link">Sign Up</Link>
            </div>
        </div>
    );
};

export default ProfessionalSignin;
