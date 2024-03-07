import React from "react"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import "../../styles/form.css"



function SignIn() {

    const navigate = useNavigate()
    const [signInData, setSignInData] = React.useState(
        {
            email: "",
            password: "",
            rememberMe: false,
        }
    )
    const [error, setError] = React.useState("")

    const {currentUser, login} = React.useContext(AuthContext)



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

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login(signInData)
            navigate("/")
        }catch (err) {
            setError(err.response.data)
        }
    }

    
    return (
        <div className="form">
            <div className="wrapper form-wrapper">
                <form action="">
                    <h1>Sign In</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Email/Username" 
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
                    <button className="btn" onClick={handleSubmit}>Sign In</button>
                    {error && <p className="error">{error}</p>}
                    <div className="register-or-login-link">
                        <p>Don't have an account? </p>
                        <Link to="/SignUp" className="bold">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn