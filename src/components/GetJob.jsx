import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaBriefcase, FaMapMarkerAlt, FaFileAlt, FaDollarSign, FaRulerCombined, FaClock } from 'react-icons/fa';
import './GetJobs.css';
import Navbar from './NavBar';

const GetJob = () => {
  const professionalId = sessionStorage.getItem('userId');
  const [jobOffers, setJobOffers] = useState([]);
  const [error, setError] = useState('');
  const [acceptedJobs, setAcceptedJobs] = useState(new Set()); // Track accepted job IDs

  useEffect(() => {
    axios.post('http://localhost:8000/getJobOffers', { professionalId }, {
      headers: { 'token': sessionStorage.getItem('token') },
    })
      .then(response => {
        setJobOffers(response.data);
      })
      .catch(error => {
        console.error("Error fetching job offers:", error);
        setError('Failed to load job offers. Please try again later.');
      });
  }, [professionalId]);

  const handleAccept = (jobId) => {
    axios.post('http://localhost:8000/updateStatus', { professionalId }, {
      headers: { 'token': sessionStorage.getItem('token') }
    })
    .then(response => {
      alert('Job accepted and status updated!');
      console.log(`Job ${jobId} accepted.`);
      setAcceptedJobs(prev => new Set(prev).add(jobId)); // Add jobId to the acceptedJobs set
    })
    .catch(error => {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again later.');
    });
  };

  return (
    <div className="job-offers-container">
        <Navbar />
      <h2 className="job-offers-heading">Job Offers</h2>
      {error && <p className="error-message">{error}</p>}
      {jobOffers.length > 0 ? (
        <ul className="job-offers-list">
          {jobOffers.map((offer, index) => (
            <li key={index} className="job-offer-item">
              <table className="job-details-table">
                <tbody>
                  <tr>
                    <td><FaUser className="icon" /> <strong>Client:</strong></td>
                    <td>{offer.clientId?.name || 'Anonymous'}</td>
                  </tr>
                  <tr>
                    <td><FaBriefcase className="icon" /> <strong>Job Type:</strong></td>
                    <td>{offer.jobType}</td>
                  </tr>
                  <tr>
                    <td><FaMapMarkerAlt className="icon" /> <strong>Location:</strong></td>
                    <td>{offer.location}</td>
                  </tr>
                  <tr>
                    <td><FaFileAlt className="icon" /> <strong>Description:</strong></td>
                    <td>{offer.description}</td>
                  </tr>
                  <tr>
                    <td><FaDollarSign className="icon" /> <strong>Budget:</strong></td>
                    <td>{offer.budget}</td>
                  </tr>
                  <tr>
                    <td><FaRulerCombined className="icon" /> <strong>Area:</strong></td>
                    <td>{offer.area}</td>
                  </tr>
                  <tr>
                    <td><FaClock className="icon" /> <strong>Timeline:</strong></td>
                    <td>{offer.timeline}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="accept-button"
                onClick={() => handleAccept(offer._id)}
                disabled={acceptedJobs.has(offer._id)} // Disable button if job is accepted
              >
                {acceptedJobs.has(offer._id) ? 'Accepted' : 'Accept'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-job-offers-message">No job offers available.</p>
      )}
    </div>
  );
};

export default GetJob;
