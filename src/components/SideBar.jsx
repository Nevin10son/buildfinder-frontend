import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {

    const userName = sessionStorage.getItem('name') 
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/clientlogin'); 
      };

  return (
    <div className="sidebar-container">
    {/* Header Section */}
    <div className="sidebar-header">
      <h1 className="project-title">BuildFinder</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>

    {/* Sidebar Links */}
    <div className="sidebar">
      <div className="sidebar-links">
        <Link to="/clientdashboard" className="sidebar-link">Home</Link>
        <Link to="/searchProfessionals" className="sidebar-link">Search Professional</Link>
        <Link to="/searchProjects" className="sidebar-link">Search Projects</Link>
        <Link to="/askQuestions" className="sidebar-link">Ask Question</Link>
        <Link to="/seeQuestionAnswers" className="sidebar-link">See Answer</Link>
      </div>

      {/* Footer with Username */}
      <div className="sidebar-footer">
        <p>Logged in as: <strong>{userName}</strong></p>
      </div>
    </div>
  </div>
  )
}

export default SideBar
