import axios from 'axios'
import React, { useState } from 'react'
import SideBar from './SideBar'
import './FindProfessional.css'

const FindProfessionals = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState({
      field: "",
      experience: "",
      location: "",
    });
  
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
  
    return (
      <div className="find-professionals-container">
        <SideBar />
        <div className="search-section">
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
            <button onClick={readValue} className="btn-search">Search</button>
          </div>
          <h1 className="heading">Find the professionals</h1>
          <div className="results">
            {data.map((item, index) => (
              <div className="result-card" key={index}>
                <h3>{item.firmname}</h3>
                <p><b>Field:</b> {item.field}</p>
                <p><b>Experience:</b> {item.experience}</p>
                <p><b>Location:</b> {item.location}</p>
                <p><b>Language:</b> {item.language}</p>
                <p><b>About:</b> {item.aboutme}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    
  
}

export default FindProfessionals
