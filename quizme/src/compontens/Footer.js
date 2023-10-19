import React from "react"
import "../style.css"

function Footer() {
    return (
        <footer>
            <ul>
                <li><a><i className="fa-solid fa-envelope"></i> Contact us</a></li>
                <li><a><i className="fa-regular fa-square-plus"></i> Create a quiz</a></li>
                <li><a><i className="fa-solid fa-circle-question"></i> General knowledge quizzes</a></li>
                <li><a><i className="fa-regular fa-star"></i> Celebrity quizzes</a></li>
                <li><a><i className="fa-regular fa-id-badge"></i> Personality quizzes</a></li>
            </ul>
        </footer>
    )
}

export default Footer