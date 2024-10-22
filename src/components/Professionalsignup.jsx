import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Professionalsignup = () => {
    const [input, setInput] = useState({
        "name":"",
        "dob":"",
        "emailid":"",
        "password":"",
        "cpassword":"",
        "mobileno":"",
        "gender":""

    })

    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value})
    }

    const readValue = () => {
        if (input.password == input.cpassword) {
             let newinput = {
                "name":input.name,
                "dob":input.dob,
                "emailid":input.emailid,
                "password":input.password,
                "mobileno":input.mobileno,
                "gender":input.gender

             }
        
        axios.post("http://localhost:8000/buildersSignup",newinput).then(
            (response) => {
                console.log(response.data)
                
                if (response.data.Status == "Success") {
                    alert("Registered Successfully")
                    setInput({
                        "name":"",
                        "dob":"",
                        "emailid":"",
                        "password":"",
                        "cpassword":"",
                        "mobileno":"",
                        "gender":""
                    })
                }
                else if (response.data.Error == "email id already exist") {
                    alert("Email is already exist")
                }
                
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }else {
        alert("The password doesn't match")
    }
    }
  return (
    <div>
      <h1>Professionals signup page</h1>
      <label htmlFor="">Name:</label><br />
      <input type="text" name='name' value={input.name} onChange={inputHandler}/><br />
      <label htmlFor="">dob</label><br />
      <input type="date" name='dob' value={input.dob} onChange={inputHandler} /><br />
      <label htmlFor="emailid">Email id:</label><br />
      <input type="email" name='emailid' value={input.emailid} onChange={inputHandler} /><br />
      <label htmlFor="">Password:</label><br />
      <input type="password" name='password' value={input.password} onChange={inputHandler} /><br />
      <label htmlFor="">Confirm Password:</label><br />
      <input type="password" name='cpassword' value={input.cpassword} onChange={inputHandler} /><br />
      <label htmlFor="">Mobile No:</label><br />
      <input type="tel" name='mobileno' value={input.mobileno} onChange={inputHandler} /><br />
      <label htmlFor="">Gender:</label>
      <select name="gender" value={input.gender} onChange={inputHandler} id="">

        <option value="">--Select Gender--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select><br />
      <button onClick={readValue}>Register</button>
      <Link to="/professionallogin">login</Link>

    </div>
  )
}

export default Professionalsignup
