import axios from 'axios';
import React, { useState } from 'react'
import './AddPost.css'

const Addpost = () => {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [files, setFiles] = useState([]);
  
    const handleFileChange = (e) => {
      setFiles(e.target.files);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      // Get professionalId (stored as userId in sessionStorage)
      const professionalId = sessionStorage.getItem('userId');
  
      // Append files to FormData
      Array.from(files).forEach((file) => {
        formData.append('postedImages', file);
      });
  
      // Append other fields
      formData.append('professionalId', professionalId);
      formData.append('description', description);
      formData.append('cost', cost);
  
      try {
        const token = sessionStorage.getItem('token'); // Replace with your auth logic
  
        const response = await axios.post('http://localhost:8000/uploadPost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token,
          },
        });
  
        alert('Post uploaded successfully!');
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading post:', error);
        alert('Failed to upload post');
      }
    };
  
  return (
    <div className="post-upload-container">
      <form onSubmit={handleSubmit} className="post-upload-form">
        <h2>Upload a New Post</h2>

        <div className="form-group">
          <label htmlFor="file">Upload Images:</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write about your post..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost (Optional):</label>
          <input
            type="number"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter cost (if any)"
          />
        </div>

        <button type="submit" className="submit-btn">Upload Post</button>
      </form>
    </div>
  
  )
}

export default Addpost
