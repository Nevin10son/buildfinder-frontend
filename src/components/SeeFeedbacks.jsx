import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SeeFeedbacks.css';
import Navbar from './NavBar';

const SeeFeedbacks = () => {
  const professionalId = sessionStorage.getItem('userId');
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.post(`http://localhost:8000/getfeedback`, { professionalId }, {
      headers: { 'token': sessionStorage.getItem('token') },
    })
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setError('Failed to load feedback. Please try again later.');
      });
  }, [professionalId]);

  return (
    <div className="feedback-container">
      <Navbar/>
      <h2 className="feedback-heading">Client Review</h2>
      {error && <p className="error-message">{error}</p>}
      {feedbacks.length > 0 ? (
        <ul className="feedback-list">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <p className="feedback-client"><strong>Client:</strong> {feedback.clientid?.name || 'Anonymous'}</p>
              <p className="feedback-text"><strong></strong> {feedback.feedback}</p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-feedback-message">No feedback available for this professional.</p>
      )}
    </div>
  );
};

export default SeeFeedbacks;
