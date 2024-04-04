import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";
import Question from "./Question"
import QuizQuestionInfo from "./QuizQuestionInfo"
import {AuthContext} from "../context/authContext"
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom"





export default function Activate(props) {
    const navigate = useNavigate()
   
    const {currentUser} = React.useContext(AuthContext)

    const {questions, quizID, category, editExistingQuiz, setEditExistingQuiz, handledelete} = React.useContext(CreateQuizContext)
    const quizTitle = JSON.parse(window.localStorage.getItem('quizTitle'))

    const handleSubmitForEditQuiz = async (quizData) => {
            try {
                await axios.put(`/quiz/update`, {quizData}, {
                    withCredentials:true,
                })  
            } catch (err) {
                console.log(err)
            }

            try {
                await axios.delete(`/quiz/questions/${quizID.current}`, {quizData}, {
                    withCredentials:true,
                })  
            } catch (err) {
                console.log(err)
            }

            setEditExistingQuiz(false)
    }

    const handleSubmit = async () => {
        const quizData = {
            title: JSON.parse(window.localStorage.getItem('quizTitle')),
            image: "",
            category: JSON.parse(window.localStorage.getItem('category')),
            user_id: currentUser.id,
            questions: questions,
            quiz_id: quizID.current
        }
        if (editExistingQuiz) {
            await handleSubmitForEditQuiz(quizData)
        } else {
            try {
                await axios.post(`/quiz`, {quizData}, {
                    withCredentials:true,
                })

            } catch (err) {
                console.log(err)
            }
        } 

        try {
            console.log("add queswtion")
            await axios.post(`/quiz/questions`, {quizData}, {
                withCredentials:true,
            })  
            handledelete()
            navigate("/MyQuizes")
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <div className={props.active === "activate" ? "settings-container" : "notShow"}>
            {questions.length > 0 && 
            <div>
                <QuizQuestionInfo fromActivate={true} quizTitle={quizTitle} quizImage={""} numberOfQuestions={questions.length} category={category}/>
                {questions.map((question, questionIndex) =>
                    <Question 
                        key={questionIndex}
                        quizText={question.questionText}
                        answers={question.answers}
                        fromActivate={true}
                        /> )
                }
            </div>}
            <div className="buttons-container">
                <button className="quiz--btn delete-btn" onClick={(e) => {
                    e.preventDefault()
                    props.setActive("setPreferences")
                    }}>Previous</button>
                <button className="quiz--btn delete-btn" onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                    }}>Submit</button>
            </div>
            </div>
        </div>
    )
}