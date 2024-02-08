import React from "react"
import {Link} from "react-router-dom"
import "../../styles/layout.css"

function Footer() {
    return (
        <footer>
            <ul>
                <li><Link to="/ContactUs"><i className="fa-solid fa-envelope"></i> Contact us</Link></li>
                <li><Link to=""><i className="fa-regular fa-square-plus"></i> Create a quiz</Link></li>
                <li><Link to="/?category=general"><i className="fa-solid fa-circle-question"></i> General knowledge quizzes</Link></li>
                <li><Link to="/?category=celebrity"><i className="fa-regular fa-star"></i> Celebrity quizzes</Link></li>
                <li><Link to="/?category=personality"><i className="fa-regular fa-id-badge"></i> Personality quizzes</Link></li>
            </ul>
        </footer>
    )
}

export default Footer