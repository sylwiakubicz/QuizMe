import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext"


function ResetPassword() {

    const {changePassword, email, error} = React.useContext(AuthContext)

    const [inputs, setInputs] = React.useState({
        email: email,
        newPassword: "",
        repeatedNewPassword: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        const error = await changePassword(inputs);
        if (!error) {
            navigate("/SignIn");
        }
    }

    return (
        <div className="form">
            <div className= "wrapper form-wrapper">
                <h1 className="accountSetingsOption">RESET PASSWORD</h1>
                <p>After reseting password you will be ask to sign in</p>
                <form>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="New password" 
                            name="newPassword"
                            value={inputs.newPassword}
                            onChange={handleChange}
                            required 
                            />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Repeat new password" 
                            name="repeatedNewPassword"
                            value={inputs.repeatedNewPassword}
                            onChange={handleChange}
                            required 
                            />
                    </div>
                    {error && <p className="error">{error}</p>}

                    <button className="btn" onClick={handleChangePassword}>Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword