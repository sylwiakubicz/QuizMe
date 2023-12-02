import React from "react"
import {Link} from "react-router-dom"
import "../style.css"

function SignIn() {
    return (
        <div className="form">
            <div className="wrapper">
                <form action="">
                    <h1>Sign In</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="remember-forgot">
                        <label className="container">Remember me
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <Link>Forgot password?</Link>
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                    <div className="register-or-login-link">
                        <p>Don't have an account? </p>
                        <Link to="/SignUp">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn