import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfessionalViewProfile.css';

const ProfessionalProfileView = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [feedback, setFeedback] = useState('');  // State to store feedback input
  const [message, setMessage] = useState('');    // State to store success or error message

  useEffect(() => {
    axios.get(`http://localhost:8000/professionals/${userId}`, {
      headers: { 'token': sessionStorage.getItem("token") },
    })
    .then((response) => {
      setProfile(response.data);
    })
    .catch((error) => {
      console.error("Error fetching profile data:", error);
    });
  }, [userId]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientId = sessionStorage.getItem('userId');
      const response = await axios.post(`http://localhost:8000/addFeedback/${userId}`, 
        { feedback, clientId }, 
        { headers: { 'token': sessionStorage.getItem("token") } }
      );
      setMessage(response.data.message); // Show success message
      setFeedback(''); // Clear feedback input
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again later.');
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="professional-profile-container">
      <img
        src={`http://localhost:8000/uploads/${profile.profilepic}`}
        alt="Profile"
        className="professional-profile-picture"
      />
      <h2 className="professional-firm-name">{profile.firmname}</h2>
      <table className="professional-info-table">
        <tbody>
          <tr>
            <td><b>Field:</b></td>
            <td>{profile.field}</td>
          </tr>
          <tr>
            <td><b>Experience:</b></td>
            <td>{profile.experience} </td>
          </tr>
          <tr>
            <td><b>Location:</b></td>
            <td>{profile.location}</td>
          </tr>
          <tr>
            <td><b>Contact:</b></td>
            <td>{profile.mobileno}</td>
          </tr>
          <tr>
            <td><b>Status:</b></td>
            <td>{profile.Status}</td>
          </tr>
          <tr>
            <td><b>Languages:</b></td>
            <td>{profile.language}</td>
          </tr>
          <tr>
            <td><b>About:</b></td>
            <td>{profile.aboutme}</td>
          </tr>
        </tbody>
      </table>
      <br />
      
      {/* Feedback Form */}
      <div className="feedback-form">
        <h3>Leave Feedback</h3>
        <form onSubmit={handleFeedbackSubmit}>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
        {message && <p>{message}</p>} {/* Display success/error message */}
      </div>
    </div>
  );
};

export default ProfessionalProfileView;
