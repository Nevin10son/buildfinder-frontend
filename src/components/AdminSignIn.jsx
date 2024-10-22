import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSignIn = () => {
    const navigate = useNavigate()
    const [input,setInput] = useState(
        {
            "username":"",
            "password":""
        }

    )

    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value})
    }

    const readValue  = () => {
        console.log(input)

        axios.post("http://localhost:8000/adminSignIn",input).then(
            (response) => {
                console.log(response.data)

                if (response.data.Status == "Invalid Username") {
                    alert("Username is Incorrect")
                }
                else if (response.data.Status == "Incorrect Password") {
                    alert("The password is incorrect")
                }
                else {
                    let token = response.data.token
                    let userId = response.data.userId

                    console.log(userId)
                    console.log(token)

                    sessionStorage.setItem("userId",userId)
                    sessionStorage.setItem("token",token)

                    navigate("/admindashboard")
                }

            }
        )
    }
  return (
    <div>
      <h1>Admin SignIn</h1>
      <label htmlFor="">Username:</label><br />
      <input type="text" name='username' value={input.username} onChange={inputHandler}/><br />
      <label htmlFor="">Password:</label><br />
      <input type="password" name='password' value={input.password} onChange={inputHandler} /><br />
      <button onClick={readValue}>Sign in</button>
    </div>
  )
}

export default AdminSignIn
