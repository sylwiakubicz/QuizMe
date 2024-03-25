import React from "react"
import img from "../images/randomImg.jpg"
import "../styles/quizCard.css"
import {Link} from "react-router-dom"
import {AuthContext} from "../context/authContext"


export function QuizCard(props) {
    const {currentUser} = React.useContext(AuthContext)

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
                {props.user_id === currentUser.id && 
                <div className="quizCard-icons">
                    <i className="fa-solid fa-pen-to-square quizCard-icon"></i>
                    <i className="fa-solid fa-trash quizCard-icon" ></i>
                </div>}
            </div>
        </Link>

    )
}