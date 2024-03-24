import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";
import Question from "./Question"
import QuizQuestionInfo from "./QuizQuestionInfo"




export default function Activate(props) {
    const {questions} = React.useContext(CreateQuizContext)
    const quizTitle = JSON.parse(window.localStorage.getItem('quizTitle'))
    
    return (
        <div className={props.active === "activate" ? "settings-container" : "notShow"}>
            {questions.length > 0 && 
            <div >
                <QuizQuestionInfo fromActivate={true} quizTitle={quizTitle} quizImage={""} numberOfQuestions={questions.length} category={"knowledge"}/>
                {questions.map((question, questionIndex) =>
                    <Question 
                        quizText={question.questionText}
                        answers={question.answers}
                        fromActivate={true}
                        /> )
                }
            </div>}                
        </div>
    )
}