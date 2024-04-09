import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"

export default function VerifyEmail() {

    const [verificationCode, setVerficationCode] = React.useState("")

    const handleChange = (e) => {
        setVerficationCode(e.target.value)
    }

    const handleVerify = async (verification) => {
        try {
            const verifyData = {
                email: localStorage.getItem("useremail_or_username"),
                verificationCode: verificationCode
            }
            await axios.post("/auth/verify/email", verifyData, {
                withCredentials: true
            } )
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
                    <div className="register-or-login-link">
                        <Link className="verify--send_again">Send new verification code</Link>
                    </div>    
                    <button className="btn" onClick={(e) => {
                        e.preventDefault()
                        handleVerify(verificationCode)
                        }}>Verify</button>
                </form>
            </div>
        </div>
    )
}