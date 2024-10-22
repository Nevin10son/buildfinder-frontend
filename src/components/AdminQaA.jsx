import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminQaA = () => {
    const [datas,setData] = useState([])
    const [input, setInput] = useState({"field":sessionStorage.getItem("field")})
    const [answer, setAnswer] = useState({
        
    })
    const fetchData = () => {
        axios.post("http://localhost:8000/getQuestions", input ,{
            headers: {
                "token":sessionStorage.getItem("token"),
                "Content-Type":"application/json"
            }
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

    const inputHandler = (event, questionId) => {
        setAnswer(prevState => ({
            ...prevState,
            [questionId]: event.target.value
        }));
    }

    const submitAnswer = (questionId) => {
        const answerPayload = {
            questionId: questionId, // Include the question's ID
            ProfessionalId: sessionStorage.getItem("userId"),
            answer: answer[questionId] // Get the specific answer for this question
        }

         // Submit answer to the backend with the related question ID
   

        axios.post("http://localhost:8000/setAnswer", answerPayload, {
            headers: {
                token: sessionStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            fetchData(); // Optionally refresh the questions list
        }).catch((error) => {
            console.log(error);
        });
    };
    

    
    useEffect(() => {fetchData()},[])
  return (
    <div>
      {datas.map(
        (value,index) => {
            return(
                <div>
                <hr />
                <p>{value.ClientId?.name}</p>
                <h4><b>{value.question}</b></h4>
                <textarea name="" id="" placeholder='type your answer here' 
                onChange={(e) => inputHandler(e,value._id)}></textarea>
                <button onClick={() => submitAnswer(value._id)}>Submit</button>
                </div>
            )
        }
      )}
    </div>
  )
}

export default AdminQaA
