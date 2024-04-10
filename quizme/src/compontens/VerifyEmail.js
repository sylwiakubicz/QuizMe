import React from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

export default function VerifyEmail() {

    const navigate = useNavigate()
    const [verificationCode, setVerficationCode] = React.useState("")
    const [error, setError] = React.useState("")

    const handleChange = (e) => {
        setVerficationCode(e.target.value)
    }

    const handleVerify = async () => {
        setError("")
        try {
            const verifyData = {
                email: JSON.parse(localStorage.getItem("useremail_or_username")),
                verificationCode: verificationCode
            }
            console.log(verificationCode)
            await axios.post("/auth/verify/email", verifyData, {
                withCredentials: true
            })
            navigate("/SignIn")

        } catch (error) {
            setError(error.response.data)
        }
    }

    const sendNewCode = async () => {
        const verifyData = {
            email: JSON.parse(localStorage.getItem("useremail_or_username")),
        }
        console.log(verifyData)
        try {
            await axios.post("/mail/send/verificationMail/new", verifyData, {
                withCredentials: true
            })
            console.log("finshed")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="size" id="contact-form">
            <div className="wrapper form-wrapper form">
                <form >
                    <h1>Verify your adress e-mail</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="text" 
                            placeholder="Your verification code"
                            onChange={handleChange}
                            value={verificationCode}
                            required 
                        />
                    </div>    
                    {error && <p className="error">{error}</p>}

                    <div className="register-or-login-link">
                        <Link className="verify--send_again" onClick={sendNewCode}>Send new verification code</Link>
                    </div>    
                    <button className="btn" onClick={(e) => {
                        e.preventDefault()
                        handleVerify()
                        }}>Verify</button>
                </form>
            </div>
        </div>
    )
}