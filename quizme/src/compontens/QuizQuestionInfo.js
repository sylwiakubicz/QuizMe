import React from "react";
import img from "../images/randomImg.jpg"


export default function QuizQuestionInfo(props) {
    return (
        <div className="quiz--infoCard">
            <div className="quiz--info">
                <h1 className="quiz--title">{props.quizTitle}</h1>
                <img className="quiz--img" src={img} alt=""></img>
            </div>
            <hr className="quiz--line"/>
            <div className="quiz--userInfo">
                <p>User email/username</p>
                <p>Your best score: 2/3</p>
            </div>
        </div>
    )
}