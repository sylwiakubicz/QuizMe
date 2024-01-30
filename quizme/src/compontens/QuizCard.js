import React from "react"
import img from "../images/randomImg.jpg"
import "../styles/quizCard.css"
import {Link} from "react-router-dom"



export function QuizCard(props) {
    return (
        <Link to={`/${props.id}`}>
            <div className="quizCard" >
                <img 
                    src={img} 
                    alt="" 
                    className="quizImg">
                </img>
                <h2 className="quizTitle">{props.title}</h2>
                <p className="quizStats"><i className="fa-solid fa-chart-simple"></i> {props.stats}</p>
            </div>
        </Link>

    )
}