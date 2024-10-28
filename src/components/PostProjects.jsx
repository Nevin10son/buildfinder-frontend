import axios from 'axios';
import React, { useState } from 'react';
import './PostProject.css';
import Navbar from './NavBar';

const PostProjects = () => {
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    projectType: '',
    location: '',
    clientname: '',
    startdt: '',
    enddt: '',
    workcost: '',
    constructionType: '',
    builtUpArea: '',
    bedrooms: '',
    style: '',
    plotSize: '',
    scope: '',
    Description: '',
  });

  const [categories, setCategories] = useState([{ title: '', images: [] }]);

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const handleImageChange = (index, event) => {
    const files = Array.from(event.target.files);
    const newCategories = [...categories];
    newCategories[index].images = files;
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { title: '', images: [] }]);
  };

  const removeCategory = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const professionalId = sessionStorage.getItem('userId');

    const formData = new FormData();
    formData.append('professionalId', professionalId);

    Object.entries(projectData).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.append('categories', JSON.stringify(categories));

    categories.forEach((category, catIndex) => {
      category.images.forEach((file, imgIndex) => {
        formData.append(`images-${catIndex}`, file);
      });
    });

    try {
      await axios.post('http://localhost:8000/addProject', formData, {
        headers: {
          'token': sessionStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.Status === "Project already exists") {
          alert("This Project already exists");
        } else if (response.data.Status === "Project Added Successfully") {
          alert("Project Added Successfully");
        }
      });
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className="post-project-container">
      <Navbar />
      <h1 className="form-heading">Add Your Projects</h1>
      <form className="post-project-form" onSubmit={handleSubmit}>
        <label className="form-label">Project Title:</label>
        <input type="text" name="projectTitle" className="form-input" onChange={handleChange} required />

        <label className="form-label">Type:</label>
        <select name="projectType" className="form-input" onChange={handleChange} required>
          <option value="" disabled selected>Select Project Type</option>
          <option value="Interior">Interior</option>
          <option value="Full Home">Full Home</option>
        </select>

        <label className="form-label">Project Location:</label>
        <input type="text" name="location" className="form-input" onChange={handleChange} required />

        <label className="form-label">Client Name:</label>
        <input type="text" name="clientname" className="form-input" onChange={handleChange} required />

        <label className="form-label">Start Date:</label>
        <input type="date" name="startdt" className="form-input" onChange={handleChange} required />

        <label className="form-label">End Date:</label>
        <input type="date" name="enddt" className="form-input" onChange={handleChange} required />

        <label className="form-label">Work Cost:</label>
        <input type="text" name="workcost" className="form-input" onChange={handleChange} required />

        <label className="form-label">Construction Type:</label>
        <select name="constructionType" className="form-input" onChange={handleChange} required>
          <option value="" disabled selected>Select Construction Type</option>
          <option value="Renovation">Renovation</option>
          <option value="New">New</option>
        </select>

        <label className="form-label">Built Up Area (sq.ft):</label>
        <input type="text" name="builtUpArea" className="form-input" onChange={handleChange} required />

        <label className="form-label">No. of Bedrooms:</label>
        <select name="bedrooms" className="form-input" onChange={handleChange} required>
          <option value="" disabled selected>Select Bedrooms</option>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <label className="form-label">Style:</label>
        <select name="style" className="form-input" onChange={handleChange} required>
          <option value="" disabled selected>Select Style</option>
          <option value="Traditional">Traditional</option>
          <option value="Modern">Modern</option>
          <option value="Contemporary">Contemporary</option>
          <option value="Minimalism">Minimalism</option>
          <option value="Colonial">Colonial</option>
          <option value="Tropical">Tropical</option>
        </select>

        <label className="form-label">Plot Size (cent):</label>
        <input type="text" name="plotSize" className="form-input" onChange={handleChange} required />

        <label className="form-label">Scope of Work:</label>
        <select name="scope" className="form-input" onChange={handleChange} required>
          <option value="" disabled selected>Select Scope of Work</option>
          <option value="Architectural Drawing">Architectural Drawing</option>
          <option value="3D Design">3D Design</option>
          <option value="Construction">Construction</option>
        </select>

        <label className="form-label">Description:</label>
        <textarea name="Description" className="form-input form-textarea" onChange={handleChange} required></textarea>

        <h2 className="category-heading">Categories (Title & Images)</h2>
        {categories.map((category, index) => (
          <div key={index} className="category-group">
            <label className="form-label">Title:</label>
            <input
              type="text"
              value={category.title}
              className="form-input"
              onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
              required
            />

            <label className="form-label">Upload Images:</label>
            <input
              type="file"
              multiple
              className="form-input"
              onChange={(e) => handleImageChange(index, e)}
              required
            />

            <button type="button" className="remove-category-button" onClick={() => removeCategory(index)}>
              Remove Category
            </button>
          </div>
        ))}
        <button type="button" className="add-category-button" onClick={addCategory}>
          Add Category
        </button>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default PostProjects;
