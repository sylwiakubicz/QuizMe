import React, {useContext} from "react";
import img from "../images/randomImg.jpg"
import {AuthContext} from "../context/authContext"



export default function QuizQuestionInfo(props) {
    const {currentUser} = useContext(AuthContext)


    return (
        <div className="quiz--infoCard">
            <div className="quiz--info">
                <h1 className="quiz--title">{props.quizTitle}</h1>
                <img className="quiz--img" src={img} alt=""></img>
            </div>
            {currentUser && 
            <>
                <hr className="quiz--line"/>
                <div className="quiz--userInfo">
                    <p>{currentUser.username}</p>
                    <p>Your best score: {2}/{props.numberOfQuestions}</p>
                </div>
            </>
            }

        </div>
    )
}