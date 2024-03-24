import React from "react"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { QuizContext } from "../../context/quizContext"

import "../../styles/layout.css"



const Header = (props) => {
    const {changeCategory} = React.useContext(QuizContext)
    
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const {currentUser, logout} = React.useContext(AuthContext)
    
    
    function handleScroll() {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    React.useEffect(() => {
        handleScroll()
    })

    return (
        <nav className="navbar">
            <div className={`nav--container ${scrollPosition > 30 ? "nav--scrolled" : ""}`}>
                <div className="nav--logo_container" >
                    <Link className="nav--logo" to="/" onClick={() => changeCategory("")}>
                        Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                    </Link>
                </div>

                <div className="nav--main_menu">

                        {currentUser ?
                            <ul className="nav--list">
                                <li className="nav--item">
                                    <Link to="/MyProfile" className="nav--link">My Profile</Link>
                                </li>
                                <li className="nav--item">
                                    <Link to="/MyQuizes" className="nav--link">My Quizes</Link>
                                </li>
                                <li className="nav--item">
                                    <Link to="/SignIn" className="nav--link" onClick={logout}>Logout</Link>
                                </li>
                                <Link to="/createquiz">
                                <li className="nav--item btn nav--link">
                                    Create a quiz
                                </li></Link>
                            </ul>
                            :
                            <ul className="nav--list">
                                <li className="nav--item">
                                    <Link to="/SignIn" className="nav--link">Sign In</Link>
                                </li>
                                <Link to="/SignIn">
                                    <li className="nav--item nav--link btn onlyForLogInUser">
                                        Create a quiz
                                    </li>
                                </Link>
                            </ul>
                            
                        }
                </div>
                <button onClick={props.switchTheme} className="themeToggle"><i className={props.theme === 'dark' ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i></button>
            </div>
        </nav>
    )
}

export default Header