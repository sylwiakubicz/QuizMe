import React from "react"
import {useNavigate} from "react-router-dom"
import img from "../images/randomImg.jpg"


export default function QuizScoreCard(props) {
    const navigate = useNavigate()

    const handleMoreQuizes = () => (
        navigate("/")
    )

    return (
        <div className="question--container quiz--infoCard">
            <div className="score-container">
                <div className="info">
                    <h1 className="title">{props.quizTitle}</h1>
                    <h2 className="score">Score {props.quizScore}/{props.quizLenght}</h2>
                </div>
                <img className="quiz--imgBig" src={img} alt=""></img>
            </div>
            <hr className="quiz--line"/>
            <div className="quiz--btnContainer">
                <button className="quiz--btn" onClick={props.resetFunction}>Try Again</button>
                <button className="quiz--btn" onClick={handleMoreQuizes}>More quizes</button>
            </div>
        </div>
    )
}