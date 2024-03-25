import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";
import Question from "./Question"
import QuizQuestionInfo from "./QuizQuestionInfo"
import {AuthContext} from "../context/authContext"
import axios from "axios";





export default function Activate(props) {

    function deleteFromLocalStorage() {
        localStorage.removeItem("active");
        localStorage.removeItem("questions");
        localStorage.removeItem("quizTitle");
        localStorage.removeItem("category");
    }

    
    const {currentUser} = React.useContext(AuthContext)

    const {questions} = React.useContext(CreateQuizContext)
    const quizTitle = JSON.parse(window.localStorage.getItem('quizTitle'))

    const handleSubmit = async () => {
        const quizData = {
            title: quizTitle,
            image: "",
            category: JSON.parse(window.localStorage.getItem('category')),
            user_id: currentUser.id,
            questions: questions,
        }

        try {
            await axios.post(`/quiz`, {quizData}, {
                withCredentials:true,
            })
            deleteFromLocalStorage()           

        } catch (err) {
            console.log(err)
        }

    }
    
    return (
        <div>
            <div className={props.active === "activate" ? "settings-container" : "notShow"}>
            {questions.length > 0 && 
            <div>
                <QuizQuestionInfo fromActivate={true} quizTitle={quizTitle} quizImage={""} numberOfQuestions={questions.length} category={"knowledge"}/>
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