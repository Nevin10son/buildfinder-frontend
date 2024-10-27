import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SideBar from './SideBar';
import axios from 'axios';
import './SearchProject.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SearchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState({ style: '', cost: '' });

  useEffect(() => {
    fetchProjects(); // Fetch all projects on initial load
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/ClientViewAllProjects',
        { style: input.style, cost: input.cost },
        {
          headers: {
            token: sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    fetchProjects(); // Re-fetch projects based on input filters
  };

  const sliderSettings = {
    dots: true,
    infinite: true,  // Enable infinite sliding
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // Adjust slider height to image height
  };

  return (
    <div className="search-projects-container">
      <SideBar /> {/* Sidebar component */}
      <div className="main-content">
        <h1 className="projects-title">Search Projects</h1>

        <div className="filter-form">
          <label className="form-label">Style:</label>
          <input
            type="text"
            name="style"
            value={input.style}
            onChange={inputHandler}
            className="form-input"
            placeholder="e.g., Contemporary"
          />

          <label className="form-label">Max Cost:</label>
          <input
            type="number"
            name="cost"
            value={input.cost}
            onChange={inputHandler}
            className="form-input"
            placeholder="e.g., 500000"
          />

          <button onClick={handleSubmit} className="filter-submit-button">Filter</button>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-images">
                <Slider {...sliderSettings}>
                  {project.images.map((img, index) => (
                    <div key={index} className="slider-image-wrapper">
                      <img
                        src={`http://localhost:8000/uploads/projects/${img}`}
                        alt={`Project Image ${index + 1}`}
                        className="project-image"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="project-details">
                <h2>{project.title}</h2>
                <p><strong>Style:</strong> {project.style}</p>
                <p><strong>Cost:</strong> {project.workCost}</p>
                <p><strong>Location:</strong> {project.location}</p>
              </div>
              <div className="project-buttons">
                <button className="view-profile-button">View Profile</button>
                <button className="view-project-button">View Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProjects;
