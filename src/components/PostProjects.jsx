import axios from 'axios';
import React, { useState } from 'react'

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

  formData.append('categories',JSON.stringify(categories))

  categories.forEach((category, catIndex) => {
    
    category.images.forEach((file, imgIndex) => {
      formData.append(`images-${catIndex}`, file);
    });
  });

  try {
    // Send data to the backend using Axios
    await axios.post('http://localhost:8000/addProject', formData, {
      headers: { 'token':sessionStorage.getItem('token'),
        'Content-Type': 'multipart/form-data' },
    }).then(
      (response)=>{
        if (response.data.Status == "Project already exists"){
          alert("This Project already exist")
        }
        else if(response.data.Status == "Project Added Successfully"){
          alert("Project Added Successfully")
        }
      }
      
      
    )

   
  } catch (error) {
    console.error('Error creating project:', error);
    alert('Failed to create project');
  }
};
  return (
    <div>
      <h1>Add Your Projects</h1>
      <label>Project Title:</label><br />
        <input type="text" name="projectTitle" onChange={handleChange} /><br />

        <label>Type:</label><br />
        <select name="projectType" onChange={handleChange}>
          <option value="Interior">Interior</option>
          <option value="Full Home">Full Home</option>
        </select><br />

        <label>Project Location:</label><br />
        <input type="text" name="location" onChange={handleChange} /><br />

        <label>Client Name:</label><br />
        <input type="text" name="clientname" onChange={handleChange} /><br />

        <label>Start Date:</label><br />
        <input type="date" name="startdt" onChange={handleChange} /><br />

        <label>End Date:</label><br />
        <input type="date" name="enddt" onChange={handleChange} /><br />

        <label>Work Cost:</label><br />
        <input type="text" name="workcost" onChange={handleChange} /><br />

        <label>Construction Type:</label><br />
        <select name="constructionType" onChange={handleChange}>
          <option value="Renovation">Renovation</option>
          <option value="New">New</option>
        </select><br />

        <label>Built Up Area (sq.ft):</label><br />
        <input type="text" name="builtUpArea" onChange={handleChange} /><br />

        <label>No. of Bedrooms:</label><br />
        <select name="bedrooms" onChange={handleChange}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select><br />

        <label>Style:</label><br />
        <select name="style" onChange={handleChange}>
          <option value="Traditional">Traditional</option>
          <option value="Modern">Modern</option>
          <option value="Contemporary">Contemporary</option>
          <option value="Minimalism">Minimalism</option>
          <option value="Colonial">Colonial</option>
          <option value="Tropical">Tropical</option>
        </select><br />

        <label>Plot Size (cent):</label><br />
        <input type="text" name="plotSize" onChange={handleChange} /><br />

        <label>Scope of Work:</label><br />
        <select name="scope" onChange={handleChange}>
          <option value="Architectural Drawing">Architectural Drawing</option>
          <option value="3D Design">3D Design</option>
          <option value="Construction">Construction</option>
        </select><br />

        <label>Description:</label><br />
        <textarea name="Description" onChange={handleChange}></textarea><br />

        {/* Dynamic Categories (Title & Images) */}
        <h2>Categories (Title & Images)</h2>
        {categories.map((category, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <label>Title:</label><br />
            <input
              type="text"
              value={category.title}
              onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
            /><br />

            <label>Upload Images:</label><br />
            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(index, e)}
            /><br />

            <button type="button" onClick={() => removeCategory(index)}>
              Remove Category
            </button>
          </div>
        ))}

        <button type="button" onClick={addCategory}>
          Add Category
        </button><br />

        <button type="submit"
        onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default PostProjects
