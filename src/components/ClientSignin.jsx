import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ClientSignin = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState(
        {
            "emailid":"",
            "password":""
        }

    )

    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value})
    }

    const readValue = () =>{
        axios.post("http://localhost:8000/clientsignin",input).then(
            (response) => {
                if (response.data.Status == "invalid Emailid") {
                    alert("Incorrect Emailid")
                }
                else if(response.data.Status == "Incorrect Password") {
                    alert("Incorrect Password")
                }
                else {
                    let token = response.data.token
                    let userid = response.data.userid
                    let name = response.data.name

                    sessionStorage.setItem("token",token)
                    sessionStorage.setItem("userid",userid)
                    sessionStorage.setItem("name",name)

                    navigate("/clientdashboard")
                }
            }
        )
    }
  return (
    <div>
      <h1>Client Sign in</h1>
      <label htmlFor="">Email id:</label><br />
      <input type="email" name='emailid' value={input.emailid} onChange={inputHandler}/><br />
      <label htmlFor="">Password:</label><br />
      <input type="password" name='password' value={input.password} onChange={inputHandler} /><br />
      <button onClick={readValue}>Login</button>
      <Link to={"/clientsignup"}>Sign up</Link>
    </div>
  )
}

export default ClientSignin
