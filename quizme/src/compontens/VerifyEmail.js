import React from "react"
import {Link} from "react-router-dom"


export default function VerifyEmail() {

    const [verificationCode, setVerficationCode] = React.useState("")

    const handleChange = (e) => {
        setVerficationCode(e.target.value)
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
                        console.log(verificationCode)
                        }}>Verify</button>
                </form>
            </div>
        </div>
    )
}