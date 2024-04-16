import React from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/authContext"
import { useSendMail } from "../hooks/useSandMail"

export default function VerifyEmail() {

    const navigate = useNavigate()
    const sendMail = useSendMail()

    const {resetPass, sendResetEmailCode, compareCodes, error, setError} = React.useContext(AuthContext)
    const [verificationCode, setVerficationCode] = React.useState("")

    const handleChange = (e) => {
        setVerficationCode(e.target.value)
    }

    const handleVerify = async () => {
        console.log(resetPass)
        if (resetPass) {
            if (compareCodes(verificationCode)) {
                navigate("/resetpassword")
            }
            
        } else {
            try {
            const verifyData = {
                email: JSON.parse(localStorage.getItem("useremail_or_username")),
                verificationCode: verificationCode
            }
            console.log(verificationCode)
            await axios.post("/auth/verify/email", verifyData, {
                withCredentials: true
            })
            localStorage.removeItem("useremail_or_username")
            navigate("/SignIn")

            } catch (error) {
                setError(error.response.data)
            }
        }
        
    }

    const sendNewCode = async () => {
        if (resetPass) {
            sendResetEmailCode()
        }
        else {
            const verifyData = {
            email: JSON.parse(localStorage.getItem("useremail_or_username")),
            }
            console.log(verifyData)

            sendMail("/auth/send/verificationMail/new" ,verifyData)
        }
        
    }

    return (
        <div className="size" id="contact-form">
            <div className="wrapper form-wrapper form">
                <form >
                    <p className="infoForUser">We have sent a code to your email <strong>{JSON.parse(localStorage.getItem("useremail_or_username"))}</strong></p>
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