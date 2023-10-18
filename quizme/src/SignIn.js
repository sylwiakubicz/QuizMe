import React from "react"
import "./style.css"

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
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                    <div className="register-or-login-link">
                        <p>Don't have an account? </p>
                        <a href="#">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn