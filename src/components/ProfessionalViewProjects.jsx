import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProfessionalViewProject.css'

const ProfessionalViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null); // Store full project details

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/ProfessionalViewProject',
          { professionalId: sessionStorage.getItem('userId') },
          { headers: { token: sessionStorage.getItem('token') } }
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const openModal = async (projectId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/getFullProjectDetails/${projectId}`,
        { headers: { token: sessionStorage.getItem('token') } }
      );
      console.log(response)
      setSelectedProjectDetails(response.data); // Store full project details in state
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error('Error fetching full project details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedProjectDetails(null); // Clear selected project details
  };

  return (
    <div className="projects-container">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div className="project-card" key={index}>
            <Slider {...sliderSettings}>
              {project.images.map((image, i) => (
                <div key={i}>
                  <img
                    src={`http://localhost:8000/uploads/projects/${image}`}
                    alt={`Project Image ${i + 1}`}
                    className="project-image"
                  />
                </div>
              ))}
            </Slider>
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="client-name">Client: {project.clientName}</p>
              <button
                className="view-project-btn"
                onClick={() => openModal(project.id)}
              >
                View Project
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}

{isModalOpen && selectedProjectDetails && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-modal-btn" onClick={closeModal}>
        Close
      </button>
      <div className="modal-left">
      <div className="modal-detail">  
        <p>Client Name: <span>{selectedProjectDetails.clientname}</span></p>
        <p>Cost: <span>{selectedProjectDetails.workcost}</span></p>
        <p>Layout: <span>{selectedProjectDetails.bedrooms} BHK</span></p>
        <p>Built Up Area: <span>{selectedProjectDetails.builtUpArea}sqft</span></p>
        <p>Start Date: <span>{selectedProjectDetails.startdt}</span></p>
        <p>Completion Date: <span>{selectedProjectDetails.enddt}</span></p>
        <p>Construction Type: <span>{selectedProjectDetails.constructionType}</span></p>
        <p>Plot Size: <span>{selectedProjectDetails.plotSize}</span></p>
        <p>Category: <span>{selectedProjectDetails.projectType}</span></p>
        <p>Location: <span>{selectedProjectDetails.location}</span></p>
        
        <p>Description:{selectedProjectDetails.Description}</p>
      </div>
      </div>
      <div className="vertical-divider" />
      <div className="modal-right">
        <h3 className="modal-project-title">
          {selectedProjectDetails.projectTitle}
        </h3>
        <div className="modal-images-container">
          {selectedProjectDetails.categories.map((category, i) => (
            <div key={i}>
              <h4>{category.title}</h4>
              {category.images.map((image, j) => (
                <img
                  key={j}
                  src={`http://localhost:8000/uploads/projects/${image.url}`}
                  alt={category.title}
                  className="modal-project-image"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ProfessionalViewProjects
