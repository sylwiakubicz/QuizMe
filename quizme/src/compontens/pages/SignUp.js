import React from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import "../../style.css"


function SignUp() {

    const navigate = useNavigate()

    const [signUpData, setSingUpData] = React.useState(
        {
            username: "",
            email: "",
            password: "",
            confrimPassword: ""
        }
    )
    const [error, setError] = React.useState("")

    function handleChange(event) {
        const {name, value} = event.target
        setSingUpData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", signUpData, {
                withCredentials: true
            })
            navigate("/SignIn")
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className="form">
            <div className="wrapper">
                <form>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Username"
                            name="username"
                            value={signUpData.username}
                            onChange={handleChange}
                            required
                            />
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="input-box">
                        <input 
                            type="email" 
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
                    {error && <p className="error">{error}</p>}
                    <button className="btn" onClick={handleSubmit}>Sign Up</button>
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