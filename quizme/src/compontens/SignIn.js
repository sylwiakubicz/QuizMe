import React from "react"
import {Link} from "react-router-dom"
import "../style.css"



function SignIn() {

    const [signInData, setSignInData] = React.useState(
        {
            email: "",
            password: "",
            rememberMe: false,
        }
    )

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setSignInData(prevData =>
            {
                return {
                    ...prevData,
                    [name]: type === "checkbox" ? checked : value 
                }
            })
    }

    return (
        <div className="form">
            <div className="wrapper">
                <form action="">
                    <h1>Sign In</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name="email"
                            value={signInData.email}
                            onChange={handleChange}
                            required 
                            />
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password" 
                            value={signInData.password}
                            onChange={handleChange}
                            required 
                            />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="remember-forgot">
                        <label className="container">Remember me
                            <input 
                            type="checkbox" 
                            name="rememberMe"
                            value={signInData.rememberMe}
                            onChange={handleChange}
                            />
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