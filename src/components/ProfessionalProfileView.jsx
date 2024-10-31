import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfessionalViewProfile.css';

const ProfessionalProfileView = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [jobRequirements, setJobRequirements] = useState({
    clientId: sessionStorage.getItem('userid'),
    jobType: '',
    location: '',
    description: '',
    budget: '',
    area: '',
    timeline: ''
  });
  const [message, setMessage] = useState('');

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
      const clientId = sessionStorage.getItem('userid');
      const response = await axios.post(`http://localhost:8000/addFeedback/${userId}`,
        { feedback, clientId },
        { headers: { 'token': sessionStorage.getItem("token") } }
      );
      setMessage(response.data.message);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again later.');
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientId = sessionStorage.getItem('userid');
      const response = await axios.post(`http://localhost:8000/addJobRequirement/${userId}`,
        jobRequirements,
        { headers: { 'token': sessionStorage.getItem("token") } }
      );
      setMessage(response.data.message);
      setJobRequirements({
        jobType: '',
        location: '',
        description: '',
        budget: '',
        area: '',
        timeline: ''
      });
    } catch (error) {
      console.error('Error submitting job requirement:', error);
      setMessage('Failed to submit job requirement. Please try again later.');
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="professional-profile-container">
      <div className="profile-left-section">
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
              <td>{profile.experience}</td>
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
        </div>
      </div>

      <div className="profile-right-section">
        <div className="job-requirements-form">
          <h3>Job Requirements</h3>
          <form onSubmit={handleJobSubmit}>
            <label htmlFor="jobType">Job Type:</label>
            <input
              id="jobType"
              type="text"
              value={jobRequirements.jobType}
              onChange={(e) => setJobRequirements({ ...jobRequirements, jobType: e.target.value })}
              required
            />

            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              value={jobRequirements.location}
              onChange={(e) => setJobRequirements({ ...jobRequirements, location: e.target.value })}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              rows="4"
              value={jobRequirements.description}
              onChange={(e) => setJobRequirements({ ...jobRequirements, description: e.target.value })}
              required
            ></textarea>

            <label htmlFor="budget">Budget:</label>
            <input
              id="budget"
              type="text"
              value={jobRequirements.budget}
              onChange={(e) => setJobRequirements({ ...jobRequirements, budget: e.target.value })}
              required
            />

            <label htmlFor="area">Area:</label>
            <input
              id="area"
              type="text"
              value={jobRequirements.area}
              onChange={(e) => setJobRequirements({ ...jobRequirements, area: e.target.value })}
              required
            />

            <label htmlFor="timeline">Timeline:</label>
            <input
              id="timeline"
              type="text"
              value={jobRequirements.timeline}
              onChange={(e) => setJobRequirements({ ...jobRequirements, timeline: e.target.value })}
              required
            />

            <button type="submit">Submit Job Requirement</button>
          </form>
        </div>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfessionalProfileView;
