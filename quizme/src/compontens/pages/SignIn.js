import React from "react"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import SendMailModal from "../SendMailModal"
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
    const [forgetPass, setForgetPass] = React.useState(false)

    const {login} = React.useContext(AuthContext)



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
            console.log(err.response.data)
            if (err.response.data === "Verify your email to sign in") {
                localStorage.setItem("useremail_or_username", JSON.stringify(signInData.email))
                navigate("/verifyemail")
            } else {
                setError(err.response.data)
            }
        }
    }


    function handleForgetPassword() {
        setForgetPass(true)
    }

    const handleClose = () => {
        setForgetPass(false)
    }
    
    return (
        <div className="size">
            <div className="wrapper form-wrapper form">
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
                        <div className="register-or-login-link">
                        <Link onClick={handleForgetPassword}>Forgot password?</Link>
                        </div>
                    </div>
                    <button className="btn" onClick={handleSubmit}>Sign In</button>
                    {error && <p className="error">{error}</p>}
                    <div className="register-or-login-link">
                        <p>Don't have an account? </p>
                        <Link to="/SignUp" className="bold">Sign Up</Link>
                    </div>
                </form>
            </div>
            <SendMailModal handleClose={handleClose} showModal={forgetPass} message={"We will send a code to verify your e-mail address. After correct verification, you will be able to set a new password."}/>
        </div>
    )
}

export default SignIn