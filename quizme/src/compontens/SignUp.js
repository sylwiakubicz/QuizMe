import React from "react"
import {Link} from "react-router-dom"
import "../style.css"

function SignUp() {
    return (
        <div className="form">
            <div className="wrapper">
                <form action="">
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Repeat password" required />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <div className="register-or-login-link">
                        <p>Do you have an account? </p>
                        <Link to="/AppSignIn">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp