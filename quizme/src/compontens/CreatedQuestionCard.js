import React from "react"

export default function CreatedQuestionCard(props) {
    return (
        <div className={props.active === "addQuestion" ? "settings-container createdQuestion" : "notShow"}>
                <div className="icons">
                    <i className="fa-solid fa-up-down"></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash"></i>
                </div>
                <h2>{props.question}</h2>
                {
                    props.answers.map((answer, a_index) =>  <p key={a_index} className={answer.isCorrect ? "correctAnswer" : ""}>{answer.text}</p>)
                }

            </div>
    )
}