import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfessionalProfileCreated = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        "userId":sessionStorage.getItem("userId"),
        "firmname":"",
        "field":"",
        "experience":"",
        "location":"",
        "language":"",
        "aboutme":"",
        "profilepic":null
    })
    
    const inputHandler = (event) => {
        if (event.target.name === "profilepic") {
            console.log(event.target.files[0])
            setInput({...input, [event.target.name]:event.target.files[0]})
        }
        else {
          setInput({...input, [event.target.name]:event.target.value})  
        }
        

    }

    const readValue = () => {
        console.log("read value funtion called")
        const formData = new FormData();
        formData.append("userId",sessionStorage.getItem("userId"))
        formData.append("firmname",input.firmname)
        formData.append("field",input.field)
        formData.append("experience",input.experience)
        formData.append("location",input.location)
        formData.append("language",input.language)
        formData.append("aboutme",input.aboutme)
        formData.append("profilepic",input.profilepic)

        axios.post("http://localhost:8000/profile",formData , {
            headers: {
                
                'token':sessionStorage.getItem("token"),
                'Content-Type':'multipart/form-data'
            }
        }).then(
            (response) => {
                if (response.data.Status == "Profile Update"){
                    alert("Profile Updated Successfully")

                    
                    navigate("/professionaldashboard")
                }
                
                
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

  return (
    <div>
        <h1>Create a Profile</h1>
        <label htmlFor="">Firmname:</label><br />
        <input type="text" name='firmname' value={input.firmname} onChange={inputHandler}/><br />
        <label htmlFor="">Field:</label><br />
        <input type="text" name='field' value={input.field} onChange={inputHandler} /><br />
        <label htmlFor="">Experience:</label><br />
        <input type="text" name='experience' value={input.experience} onChange={inputHandler} /><br />
        <label htmlFor="">location:</label><br />
        <input type="text" name='location' value={input.location} onChange={inputHandler} /><br />
        <label htmlFor="">language:</label><br />
        <input type="text" name='language' value={input.language} onChange={inputHandler} /><br />
        <label htmlFor="">About:</label><br />
        <textarea name="aboutme" value={input.aboutme} onChange={inputHandler} id=""></textarea><br />
        <label htmlFor="">Profile Pic:</label><br />
        <input type="file" name='profilepic'  onChange={inputHandler} /><br />
        <button onClick={readValue}>Save</button>
    </div>
  )
}

export default ProfessionalProfileCreated
