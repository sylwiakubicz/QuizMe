import React from "react"
import {Link} from "react-router-dom"
import "../style.css"


function SignUp() {

    const [signUpData, setSingUpData] = React.useState(
        {
            email: "",
            password: "",
            confrimPassword: ""
        }
    )
    function handleChange(event) {
        const {name, value} = event.target
        setSingUpData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }


    return (
        <div className="form">
            <div className="wrapper">
                <form action="">
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Email"
                            name="email"
                            value={signUpData.email}
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
                            value={signUpData.password}
                            onChange={handleChange} 
                            required 
                            />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Repeat password" 
                            name="confrimPassword"
                            value={signUpData.confrimPassword}
                            onChange={handleChange}
                            required 
                            />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <div className="register-or-login-link">
                        <p>Do you have an account? </p>
                        <Link to="/SignIn">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp