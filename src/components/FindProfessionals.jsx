import axios from 'axios'
import React, { useState } from 'react'
import SideBar from './SideBar'

const FindProfessionals = () => {
    const [data, setdata] = useState([])
    const [input, setInput] = useState(
        {
            "field":"",
            "experience":"",
            "location":""
        }
    )

    const inputHandler = (event) => {
        setInput({...input, [event.target.name]: event.target.value})
    }

    const readValue = () => {
        axios.post("http://localhost:8000/searchDesigns",input, {
            headers: {
                'token':sessionStorage.getItem("token"),
                'Content-Type':'application/json'
            }
        }).then(
            (response) => {
                console.log(response.data)
                if (response.data.Status == "No result"){
                    alert("No result found")
                }
                else {
                    setdata(response.data)
                }
            }
        )
    }
  return (
    <div style={{ display: 'flex' }}>
        <SideBar/>
      <h1>Find the professionals</h1>
      <label htmlFor="">Field:</label>
      <select name="field" value={input.field} onChange={inputHandler}>
        <option value="">Select Field</option>
        <option value="Architecture">Architecture</option>
        <option value="Interior Designers">Interior Designers</option>
        <option value="Civil Engineers">Civil Engineers</option>
        <option value="Electrician">Electrician</option>
        <option value="Landscape">Landscape</option>
      </select>

      <label htmlFor="">Experience:</label>
        <input type="text" name='experience' value={input.experience} onChange={inputHandler} />

      <label htmlFor="">Location:</label>
      <input type="text" name='location' value={input.location} onChange={inputHandler} />
    
      <button onClick={readValue}>Search</button>

      <div>
        {data.map(
            (item, index) => {
                return (
                <div>
                    <br />
                    <hr />
                    <h3>{item.firmname}</h3>
                    <p>Field: {item.field}</p>
                    <p>Experience: {item.experience}</p>
                    <p>Location: {item.location}</p>
                    <p>Language: {item.language}</p>
                    <p>About: {item.aboutme}</p>
                </div>
                )
            }
        )}
      </div>
    </div>

    
  )
}

export default FindProfessionals
