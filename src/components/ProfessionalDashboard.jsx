  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import NavBar from './NavBar';
  import './ProfessionalDashboard.css';

  const ProfessionalDashboard = () => {
    const [data, setData] = useState([]);
    const [userId] = useState({ "userId": sessionStorage.getItem("userId") });
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [profilePicFile, setProfilePicFile] = useState(null);

    const fetchData = () => {
      axios.post("http://localhost:8000/builderDashboard", userId, {
        headers: { "token": sessionStorage.getItem("token"), "Content-Type": "application/json" },
        params: { populate: 'userId' }
      }).then((response) => {
        setData(response.data);
        setEditedProfile(response.data[0]); // Load initial data into edited profile
      }).catch((error) => console.log(error));
    };

    useEffect(() => { fetchData() }, []);

    const toggleEdit = (index) => {
      setIsEditing(!isEditing);
      setEditedProfile(data[index]); // Load the selected profile data into edited profile
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedProfile({ ...editedProfile, [name]: value });
    };

    const handleImageChange = (e) => {
      setProfilePicFile(e.target.files[0]);
    };

    const saveChanges = () => {
      const formData = new FormData();
      const updates = { ...editedProfile };
    
      // Append userId explicitly
      formData.append("userId", sessionStorage.getItem("userId"));
    
      // Append each field in updates
      Object.keys(updates).forEach((key) => {
        formData.append(`updates[${key}]`, updates[key]);
      });
    
      // Append profile picture if available
      if (profilePicFile) formData.append("profilepic", profilePicFile);
    
      axios.put("http://localhost:8000/editProfile", formData, {
        headers: {
          "token": sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      }).then(() => {
        fetchData(); // Refresh data
        setIsEditing(false); // Exit editing mode
      }).catch((error) => console.log(error));
    };
    

    return (
      <div>
        <NavBar />
        <div className="dashboard-content">
          {data.map((value, index) => {
            const imageUrl = profilePicFile
              ? URL.createObjectURL(profilePicFile)
              : `http://localhost:8000/uploads/${value.profilepic}`;
            return (
              <div key={index} className="profile-card">
                <img src={imageUrl} alt="Profile" className="profile-image" />
                {isEditing ? (
                  <div>
                    <div className="profile-input-group">
                      <label htmlFor="firmname">Firm Name</label>
                      <input type="text" name="firmname" value={editedProfile.firmname || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="field">Field</label>
                      <input type="text" name="field" value={editedProfile.field || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="mobileno">Contact</label>
                      <input type="text" name="mobileno" value={editedProfile.mobileno || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="experience">Experience</label>
                      <input type="text" name="experience" value={editedProfile.experience || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="language">Language</label>
                      <input type="text" name="language" value={editedProfile.language || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="location">Location</label>
                      <input type="text" name="location" value={editedProfile.location || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="aboutme">About Me</label>
                      <textarea name="aboutme" value={editedProfile.aboutme || ''} onChange={handleInputChange} className="profile-input" />
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="Status">Status</label>
                      <select name="Status" value={editedProfile.Status || ''} onChange={handleInputChange} className="profile-input">
                        <option value="Currently Occupied">Currently Occupied</option>
                        <option value="Available for Hiring">Available for Hiring</option>
                      </select>
                    </div>
                    <div className="profile-input-group">
                      <label htmlFor="profilepic">Profile Picture</label>
                      <input type="file" name="profilepic" onChange={handleImageChange} className="profile-input" />
                    </div>
                    <button onClick={saveChanges} className="save-button">Save</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h1 className="profile-name">{value.firmname}</h1>
                    <p>Field: {value.field}</p>
                    <p>Contact: {value.mobileno}</p>
                    <p>Experience: {value.experience}</p>
                    <p>Language: {value.language}</p>
                    <p>Location: {value.location}</p>
                    <p>Bio: {value.aboutme}</p>
                    <p>Status: {value.Status}</p>
                    <button onClick={() => toggleEdit(index)} className="edit-button">Edit Profile</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  export default ProfessionalDashboard;
