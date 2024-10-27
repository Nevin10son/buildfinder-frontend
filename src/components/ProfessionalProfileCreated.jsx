import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessionalProfileCreated.css';

const ProfessionalProfileCreated = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        userId: sessionStorage.getItem("userId"),
        firmname: "",
        field: "",
        experience: "",
        location: "",
        language: "",
        aboutme: "",
        profilepic: null
    });
    const [preview, setPreview] = useState(null);

    const inputHandler = (event) => {
        if (event.target.name === "profilepic") {
            const file = event.target.files[0];
            setInput({ ...input, [event.target.name]: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setInput({ ...input, [event.target.name]: event.target.value });
        }
    };

    const readValue = () => {
        const formData = new FormData();
        formData.append("userId", sessionStorage.getItem("userId"));
        formData.append("firmname", input.firmname);
        formData.append("field", input.field);
        formData.append("experience", input.experience);
        formData.append("location", input.location);
        formData.append("language", input.language);
        formData.append("aboutme", input.aboutme);
        formData.append("profilepic", input.profilepic);

        axios.post("http://localhost:8000/profile", formData, {
            headers: {
                token: sessionStorage.getItem("token"),
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.Status === "Profile Update") {
                alert("Profile Updated Successfully");
                navigate("/professionaldashboard");
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Create a Profile</h1>
            <div className="profile-form">
                {['firmname', 'field', 'experience', 'location', 'language'].map((field, index) => (
                    <div className="form-group" key={index}>
                        <input
                            type="text"
                            name={field}
                            value={input[field]}
                            onChange={inputHandler}
                            className="profile-input"
                            placeholder=" "
                            required
                        />
                        <label className="floating-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    </div>
                ))}
                <div className="form-group">
                    <textarea
                        name="aboutme"
                        value={input.aboutme}
                        onChange={inputHandler}
                        className="profile-textarea"
                        placeholder=" "
                        required
                    />
                    <label className="floating-label">About</label>
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        name="profilepic"
                        id="profilepic"
                        onChange={inputHandler}
                        className="profile-input-file"
                    />
                    <label htmlFor="profilepic" className="file-label">Upload Profile Pic</label>
                </div>
                {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
                <button onClick={readValue} className="profile-button">Save</button>
            </div>
        </div>
    );
};

export default ProfessionalProfileCreated;
