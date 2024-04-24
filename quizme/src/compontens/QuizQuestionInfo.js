import React, {useContext} from "react";
import {AuthContext} from "../context/authContext"
import DefaultImage from "../images/randomImg.jpg"


export default function QuizQuestionInfo(props) {
    const {currentUser} = useContext(AuthContext)


    return (
        <div className="quiz--infoCard">
            <div className="quiz--info">
                <h1 className="quiz--title">{props.quizTitle}</h1>
                <img className="quiz--img" src={props.quizImage ? props.quizImage : DefaultImage} alt=""></img>
            </div>
            {currentUser && !props.fromActivate && 
            <>
                <hr className="quiz--line"/>
                <div className="quiz--userInfo">
                    <p>{currentUser.username}</p>
                    <p>Your best score: {props.userScore === null ? 0 : props.userScore}/{props.numberOfQuestions}</p>
                </div>
            </>
            }

            { props.fromActivate &&
                <>
                    <hr className="quiz--line"/>
                    <div className="quiz--userInfo">
                        <p>Category: {props.category}</p>
                        <p>Numer of questions: {props.numberOfQuestions}</p>
                    </div>
                 </>

            }

        </div>
    )
}