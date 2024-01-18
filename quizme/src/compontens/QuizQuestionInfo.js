import React from "react";


export default function QuizQuestionInfo(props) {
    return (
        <div className="quiz--info">
            <h1 className="quiz--title">{props.quizTitle}</h1>
            <hr className="quiz--line"/>
            <div className="quiz--userInfo">
                <p>User email/username</p>
                <p>Your best score: 2/3</p>
            </div>
        </div>
    )
}