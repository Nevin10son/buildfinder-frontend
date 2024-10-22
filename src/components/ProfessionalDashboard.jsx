import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProfessionalDashboard = () => {
  const [data, setData] = useState([])
  const [userId, setUserid] = useState({"userId":sessionStorage.getItem("userId")})
  const fetchData = () => {
    axios.post("http://localhost:8000/builderDashboard",userId,{
      headers:{"token":sessionStorage.getItem("token"),"Content-Type":"application/json"},
      params: {
        populate: 'userId'
      }
    }).then(
      (response) => {
        console.log(response.data)
        setData(response.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }
  useEffect(() =>{fetchData()},[])
  return (
    
      <div>
      {data.map(
        (value,index) => {
          const imageUrl = `http://localhost:8000/uploads/${value.profilepic}`
          return (
          <div>
          <img src={imageUrl} alt="Profile" style={{ width: '150px', height: '150px' }} />
          <h1>{value.firmname}</h1>
          <p>Field: {value.field}</p>
          <p>Experience: {value.experience}</p>
          <p>Language: {value.language}</p>
          <p>Location: {value.location}</p>
          <p>Bio: {value.aboutme}</p>
          <Link to={"/professionalQaA"}>Answer the questions</Link><br />
          <Link to={"/postProjects"}>Post Projects</Link><br />
          <Link to={"/ViewProjectProfessional"}>View Your Projects</Link><br />
          <Link to={"/addpost"}>Add Post</Link><br />
          <Link to={"/viewAllPosts"}>View All Posts</Link><br />
          
          </div>
          
          )
        }
      )}
    
    </div>
  )
}

export default ProfessionalDashboard
