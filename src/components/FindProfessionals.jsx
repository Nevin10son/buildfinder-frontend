import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import SideBar from './SideBar';
import './FindProfessional.css';

const FindProfessionals = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    field: "",
    experience: "",
    location: "",
    Status: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    axios.post("http://localhost:8000/searchDesigns", input, {
      headers: {
        'token': sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.data.Status === "No result") {
        alert("No result found");
      } else {
        setData(response.data);
      }
    });
  };

  // Navigate to ProfessionalProfileView with specific professional's data
  const viewProfile = (professionalId) => {
    navigate(`/professionalProfileView/${professionalId}`);
  };

  return (
    <div className="main-container">
      <SideBar />
      <div className="find-professionals-container">
        <h1 className="heading">Find the Professionals</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="field">Field:</label>
            <select name="field" value={input.field} onChange={inputHandler} className="input">
              <option value="">Select Field</option>
              <option value="Architecture">Architecture</option>
              <option value="Interior Designers">Interior Designers</option>
              <option value="Civil Engineers">Civil Engineers</option>
              <option value="Electrician">Electrician</option>
              <option value="Landscape">Landscape</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience:</label>
            <input type="text" name="experience" value={input.experience} onChange={inputHandler} className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" name="location" value={input.location} onChange={inputHandler} className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="Status">Status:</label>
            <select name="Status" value={input.Status} onChange={inputHandler} className="input">
              <option value="" disabled>Select Status</option>
              <option value="Currently Occupied">Currently Occupied</option>
              <option value="Available for Hiring">Available for Hiring</option>
            </select>
          </div>
          <button onClick={readValue} className="btn-search">Search</button>
        </div>

        <div className="results">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div className="result-card" key={index}>
                <img
                  src={`http://localhost:8000/uploads/${item.profilepic}`} // Display profile image
                  alt="Profile"
                  className="profile-image"
                />
                <div className="result-info">
                  <h3>{item.firmname}</h3>
                  <p><b>Field:</b> {item.field}</p>
                  <p><b>Location:</b> {item.location}</p>
                </div>
                <button 
                  className="btn-view-profile"
                  onClick={() => viewProfile(item.userId)} // Navigate with the professional ID
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindProfessionals;
