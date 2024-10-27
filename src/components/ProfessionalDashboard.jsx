import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import './ProfessionalDashboard.css'

const ProfessionalDashboard = () => {
  const [data, setData] = useState([])
  const [userId, setUserid] = useState({ "userId": sessionStorage.getItem("userId") })

  const fetchData = () => {
    axios.post("http://localhost:8000/builderDashboard", userId, {
      headers: { "token": sessionStorage.getItem("token"), "Content-Type": "application/json" },
      params: { populate: 'userId' }
    }).then(
      (response) => {
        setData(response.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div>
      <NavBar />
      <div className="dashboard-content">
        {data.map((value, index) => {
          const imageUrl = `http://localhost:8000/uploads/${value.profilepic}`
          return (
            <div key={index} className="profile-card">
              <img src={imageUrl} alt="Profile" className="profile-image" />
              <h1 className="profile-name">{value.firmname}</h1>
              <p>Field: {value.field}</p>
              <p>Contact: {value.mobileno}</p>
              <p>Experience: {value.experience}</p>
              <p>Language: {value.language}</p>
              <p>Location: {value.location}</p>
              <p>Bio: {value.aboutme}</p>
              <p>Status: {value.Status}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProfessionalDashboard
