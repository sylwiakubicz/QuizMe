import React from "react"
import {Link} from "react-router-dom"
import "../style.css"


const Header = () => {
    return (
        <nav className="navbar">
            <div className="nav--container">
                <div className="nav--logo_container">
                    <Link className="nav--logo" to="/">
                        Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                    </Link>
                </div>

                <div className="nav--main_menu">
                    <ul className="nav--list">
                        <li className="nav--item">
                            <Link to="/SignIn" className="nav--link">Login</Link>
                        </li>
                        <li className="nav--item btn">
                            <Link to="#" className="nav--link">Create a quiz</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header