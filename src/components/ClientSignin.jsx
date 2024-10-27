import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './ClientSignin.css';

const ClientSignin = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        emailid: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const readValue = () => {
        axios.post("http://localhost:8000/clientsignin", input).then(
            (response) => {
                if (response.data.Status === "invalid Emailid") {
                    alert("Incorrect Emailid");
                } else if (response.data.Status === "Incorrect Password") {
                    alert("Incorrect Password");
                } else {
                    let token = response.data.token;
                    let userid = response.data.userid;
                    let name = response.data.name;

                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("userid", userid);
                    sessionStorage.setItem("name", name);

                    navigate("/clientdashboard");
                }
            }
        );
    };

    return (
        <div className="signin-container">
            <h1 className="signin-title">Client Sign In</h1>
            <div className="signin-form">
                <div className="form-group">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
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
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
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
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <button onClick={readValue} className="signin-button">Login</button>
                <Link to="/clientsignup" className="signin-link">Sign Up</Link>
            </div>
        </div>
    );
};

export default ClientSignin;
