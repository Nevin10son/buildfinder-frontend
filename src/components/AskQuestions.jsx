import axios from 'axios'
import React, { useState } from 'react'
import SideBar from './SideBar'

const AskQuestions = () => {
    const [input,setInput] = useState( {
        "ClientId":sessionStorage.getItem('userid'),
        "field":"",
        "question":""
    })

    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value})
    }
    
    const readValue = () => {
        console.log(input)
        axios.post("http://localhost:8000/askQuestion",input,{
            headers:{
                "token":sessionStorage.getItem("token"),
                "Content-Type":"application/json"
            }

        }).then(
            (response) => {
                console.log(response.data)
                if (response.data.Status == "Success"){
                    alert("Question Submitted Successfully")
            }else{
                alert("An error Occured")
            }
        }
        )
    }
  return (
    <div style={{ display: 'flex' }}>
        <SideBar/>
        <h1>Clients can ask Question here to the professionals</h1>
      <label htmlFor="">Field:</label>
      <input type="text" name="field" value={input.field} onChange={inputHandler} /><br />
      <label htmlFor="">Ask Your Question here</label><br />
      <textarea name="question" value={input.question} onChange={inputHandler} ></textarea><br />
      <button onClick={readValue}>Submit</button>
    </div>
  )
}

export default AskQuestions
