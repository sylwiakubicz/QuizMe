import React from "react"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { QuizContext } from "../../context/quizContext"

import "../../styles/layout.css"



const Header = (props) => {

    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        if (width > 1035) {
            setBtnActive(false)
        }
    }, [width])

    const {changeCategory} = React.useContext(QuizContext)
    
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const {currentUser, logout} = React.useContext(AuthContext)
    
    const [btnActive, setBtnActive] = React.useState(false)

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
        <nav className={`navbar ${scrollPosition > 30 ? "nav--scrolled" : ""}`} style={btnActive ? {height: "93px"} : {height: ""}}>
            <div className="nav--container">
                <div className="nav--logo_container" style={btnActive ? {display: "none"} : {display: "block"}}>
                    <Link className="nav--logo" to="/" onClick={() => changeCategory("")}>
                        Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                    </Link>
                </div>

                <div className="nav--main_menu">

                        {currentUser ?
                        // looged in users
                        <div>
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
                                    </li>
                                </Link>
                            </ul> 

                                {/* logged in users on smaller screens */}

                                <div className="btn-toggle" onClick={() => setBtnActive(prev => !prev)} style={btnActive ? {display: "none"} : {display: ""}}>
                                    <i className="fa-solid fa-bars"></i>
                                </div>

                                <div className="dropdown-menu" style={btnActive ? { right: 0 } : {right: -500}}>
                                    <div className="toggle-logo-container">
                                        <div className="nav--logo_container">
                                            <Link className="nav--logo" to="/" onClick={() => changeCategory("")}>
                                                Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                                            </Link>
                                        </div>
                                        <div className="btnContainer">
                                            <div className="btn-toggle btn-dropdown" onClick={() => setBtnActive(prev => !prev)}>
                                                <i class="fa-solid fa-bars"></i>
                                            </div>
                                            <button onClick={props.switchTheme} className="themeToggle themeToggleDropdown" style={{display: "block"}}><i className={props.theme === 'dark' ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i></button>

                                        </div>
                                    </div>
                                        <li className="nav--item" onClick={() => setBtnActive(prev => !prev)}>
                                            <Link to="/MyProfile" className="nav--link">My Profile</Link>
                                        </li>
                                        <li className="nav--item" onClick={() => setBtnActive(prev => !prev)}>
                                            <Link to="/MyQuizes" className="nav--link">My Quizes</Link>
                                        </li>
                                        <li className="nav--item" onClick={() => setBtnActive(prev => !prev)}>
                                            <Link to="/SignIn" className="nav--link" onClick={logout}>Logout</Link>
                                        </li>
                                        <Link to="/createquiz" onClick={() => setBtnActive(prev => !prev)}>
                                            <li className="nav--item btn nav--link">
                                                Create a quiz
                                            </li>
                                        </Link>
                                </div>
                            </div>

                            :

                            // Not logged in users
                            <div>
                                <ul className="nav--list ">
                                    <li className="nav--item">
                                        <Link to="/SignIn" className="nav--link">Sign In</Link>
                                    </li>
                                    <Link to="/SignIn">
                                        <li className="nav--item nav--link btn onlyForLogInUser">
                                            Create a quiz
                                        </li>
                                    </Link>
                                </ul>

                            {/* not logged in users on small screens */}
                            <div className="btn-toggle" onClick={() => setBtnActive(prev => !prev)} style={btnActive ? {display: "none"} : {display: ""}}>
                                    <i className="fa-solid fa-bars"></i>
                                </div>

                                <div className="dropdown-menu" style={btnActive ? { right: 0 } : {right: -500}}>
                                    <div className="toggle-logo-container">
                                        <div className="nav--logo_container">
                                            <Link className="nav--logo" to="/" onClick={() => changeCategory("")}>
                                                Qu<i className="fa-solid fa-question fa-rotate-180"></i>zMe
                                            </Link>
                                        </div>
                                        <div className="btnContainer">
                                            <div className="btn-toggle btn-dropdown" onClick={() => setBtnActive(prev => !prev)}>
                                                <i class="fa-solid fa-bars"></i>
                                            </div>
                                            <button onClick={props.switchTheme} className="themeToggle themeToggleDropdown" style={{display: "block"}}><i className={props.theme === 'dark' ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i></button>
                                        </div>
                                    </div>
                                    <li className="nav--item">
                                        <Link to="/SignIn" className="nav--link"  onClick={() => setBtnActive(prev => !prev)} >Sign In</Link>
                                    </li>
                                    <Link to="/SignIn">
                                        <li className="nav--item nav--link btn onlyForLogInUser">
                                            Create a quiz
                                        </li>
                                    </Link>
                                </div>
                            </div>
                        }
                </div>
                <button onClick={props.switchTheme} className="themeToggle"><i className={props.theme === 'dark' ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i></button>
            </div>
        </nav> 
    )
}

export default Header