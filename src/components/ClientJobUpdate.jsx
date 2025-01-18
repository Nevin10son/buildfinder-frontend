import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import './ClientJobUpdates.css';

const ClientJobUpdate = () => {
  const clientId = sessionStorage.getItem('userid');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch jobs posted by the client
    axios.get('http://localhost:8000/getClientJobs', {
      params: { clientId },
      headers: { 'token': sessionStorage.getItem('token') },
    })
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching client jobs:', error);
        setError('Failed to load job updates. Please try again later.');
      });
  }, [clientId]);

  // Function to handle job deletion with a confirmation prompt
  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      axios.delete(`http://localhost:8000/deleteJob/${jobId}`, {
        headers: { 'token': sessionStorage.getItem('token') },
      })
        .then(() => {
          setJobs(jobs.filter(job => job._id !== jobId)); // Remove job from list after deletion
        })
        .catch(error => {
          console.error('Error deleting job:', error);
          setError('Failed to delete the job. Please try again later.');
        });
    }
  };

  return (
    <div className="main-container">
      <SideBar />
      <div className="client-job-update-container">
        <h2 className="job-update-heading">My Posted Jobs</h2>
        {error && <p className="error-message">{error}</p>}
        {jobs.length > 0 ? (
          <table className="job-table">
            <thead>
              <tr>
                <th>Job Type</th>
                <th>Location</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Area</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="job-row">
                  <td>{job.jobType}</td>
                  <td>{job.location}</td>
                  <td>{job.description}</td>
                  <td>{job.budget}</td>
                  <td>{job.area}</td>
                  <td>{job.timeline}</td>
                  <td>
                    <span className={`status ${job.offerStatus === 'Accepted' ? 'accepted' : job.offerStatus === 'Declined' ? 'declined' : 'pending'}`}>
                      {job.offerStatus || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(job._id)}
                      disabled={job.offerStatus === 'accepted'}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-jobs-message">You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientJobUpdate;
