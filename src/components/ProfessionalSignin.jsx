import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProfessionalSignin = () => {
    const navigate = useNavigate()
    const [input,setInput] = useState(
        {
            "emailid":"",
            "password":""
        }
    )
    
    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value})
    }

    const readValue = () => {
        axios.post("http://localhost:8000/builderSignin",input).then(
            (response) => {
                if (response.data.Status == "Invalid Username") {
                    alert("Username not found")
                }
                else if (response.data.Status == "Incorrect Password") {
                    alert("Incorrect password")
                }
                else {
                    let token = response.data.token
                    let userId = response.data.userid
                    let profilepage = response.data.profileCreated
                    let field = response.data.field

                    sessionStorage.setItem("token",token)
                    sessionStorage.setItem("userId",userId)
                    sessionStorage.setItem("field",field)
                     
                    if(profilepage) {
                        navigate("/professionaldashboard")
                    }
                    else {
                        navigate("/profilecreation")
                    }
                }
            }
        )
    }
  return (
    <div>
      <h1>Professional Sign in</h1>
      <label htmlFor="">Email id:</label><br />
      <input type="email" name='emailid' value={input.emailid} onChange={inputHandler} /><br />
      <label htmlFor="">Password:</label><br />
      <input type="password" name='password' value={input.password} onChange={inputHandler} /><br />
      <button onClick={readValue}>Login</button>
      <Link to={"/professionalsignup"}>Sign up</Link>
    </div>
  )
}

export default ProfessionalSignin
