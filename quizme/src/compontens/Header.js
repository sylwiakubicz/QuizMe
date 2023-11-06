import React from "react"
import "../style.css"


function Header() {
    return (
        <nav className="navbar">
            <div className="nav--container">
                <div className="nav--logo_container">
                    <a className="nav--logo" href="#">
                        Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                    </a>
                </div>

                <div className="nav--main_menu">
                    <ul className="nav--list">
                        <li className="nav--item">
                            <a href="#" className="nav--link">Login</a>
                        </li>
                        <li className="nav--item btn">
                            <a href="#" className="nav--link">Create a quiz</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header