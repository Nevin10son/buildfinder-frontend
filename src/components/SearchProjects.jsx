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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
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
                <button onClick={() => openModal(project)} className="view-project-button">View Project</button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={closeModal} className="close-button">X</button>
              {selectedProject && (
                <div>
                  <h2>{selectedProject.title}</h2>
                  
                  {/* Project Details Table */}
                  <table className="project-details-table">
                    <tbody>
                      <tr>
                        <td><strong>Style:</strong></td>
                        <td>{selectedProject.style}</td>
                      </tr>
                      <tr>
                        <td><strong>Cost:</strong></td>
                        <td>{selectedProject.workCost}</td>
                      </tr>
                      <tr>
                        <td><strong>Location:</strong></td>
                        <td>{selectedProject.location}</td>
                      </tr>
                      <tr>
                        <td><strong>Project Type:</strong></td>
                        <td>{selectedProject.projectType}</td>
                      </tr>
                      <tr>
                        <td><strong>Client Name:</strong></td>
                        <td>{selectedProject.clientname}</td>
                      </tr>
                      <tr>
                        <td><strong>Started On:</strong></td>
                        <td>{selectedProject.startdt}</td>
                      </tr>
                      <tr>
                        <td><strong>Completed On:</strong></td>
                        <td>{selectedProject.enddt}</td>
                      </tr>
                      <tr>
                        <td><strong>Construction Type:</strong></td>
                        <td>{selectedProject.constructionType}</td>
                      </tr>
                      <tr>
                        <td><strong>Built Up Area:</strong></td>
                        <td>{selectedProject.builtUpArea}</td>
                      </tr>
                      <tr>
                        <td><strong>Bedrooms:</strong></td>
                        <td>{selectedProject.bedrooms}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Display images without slider */}
                  <div className="modal-images">
                    {selectedProject.images.map((img, index) => (
                      <div key={index} className="modal-image-item">
                        <p><strong>Image Title:</strong> {`Image ${index + 1}`}</p>
                        <img
                          src={`http://localhost:8000/uploads/projects/${img}`}
                          alt={`Project Image ${index + 1}`}
                          className="modal-project-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProjects;
