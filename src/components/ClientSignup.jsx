import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ClientSignup = () => {

    const [input, setInput] = useState(
        {
            "name":"",
            "mobileno":"",
            "emailid":"",
            "password":"",
            "cpassword":"",
            "location":""
        }
    )

    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value})
    }

    const readValue = () => {
        if (input.password == input.cpassword) {
            let newinput = {
                "name":input.name,
                "mobileno":input.mobileno,
                "emailid":input.emailid,
                "password":input.password,
                "location":input.location

            }
            axios.post("http://localhost:8000/clientsignup",newinput).then(
                (response) => {
                    if (response.data.Status == "Email id already existing") {
                        alert("Email already used")
                    }
                    else if (response.data.Status == "Success") {
                        alert("Registered Successfully")
                        setInput(
                            {
                                "name":"",
                                "mobileno":"",
                                "emailid":"",
                                "password":"",
                                "cpassword":"",
                                "location":""
                            })
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        }
        else {
            alert("The password doesn't match")
        }
    }
  return (
    <div>
      <h1>Client Sign up</h1>
      <label htmlFor="">Name:</label><br />
      <input type="text" name='name' value={input.name} onChange={inputHandler}/><br />
      <label htmlFor="">mobile No:</label><br />
      <input type="tel" name='mobileno' value={input.mobileno} onChange={inputHandler} /><br />
      <label htmlFor="">Email id:</label><br />
      <input type="email" name='emailid' value={input.emailid} onChange={inputHandler} /><br />
      <label htmlFor="">password:</label><br />
      <input type="password" name='password' value={input.password} onChange={inputHandler} /><br />
      <label htmlFor="">Confirm Password:</label><br />
      <input type="password" name='cpassword' value={input.cpassword} onChange={inputHandler} /><br />
      <label htmlFor="">Location:</label><br />
      <textarea name="location" value={input.location} onChange={inputHandler} id=""></textarea><br />
      <button onClick={readValue}>Register</button>
      <Link to={"/clientlogin"}>login</Link>
    </div>
  )
}

export default ClientSignup
