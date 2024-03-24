import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";
import Question from "./Question"
import QuizQuestionInfo from "./QuizQuestionInfo"


function deleteFromLocalStorage() {
    localStorage.removeItem("active");
}



export default function Activate(props) {
    const {questions} = React.useContext(CreateQuizContext)
    const quizTitle = JSON.parse(window.localStorage.getItem('quizTitle'))
    
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
                    deleteFromLocalStorage()
                    }}>Submit</button>
            </div>
            </div>
        </div>
    )
}