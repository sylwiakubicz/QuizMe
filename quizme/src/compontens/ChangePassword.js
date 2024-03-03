import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext"


function ChangePassword(props) {

    const {changePassword, error} = React.useContext(AuthContext)


    const [inputs, setInputs] = React.useState({
        oldPassword: "",
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


    const handleChangePassword = (e) => {
        e.preventDefault()
        changePassword(inputs)
        navigate("/SignIn")
    }

    return (
        <div className={props.active === "changePassword" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">CHANGE PASSWORD</h1>
            <form className="wrapper">
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Old password" 
                        name="oldPassword"
                        value={inputs.oldPassword}
                        onChange={handleChange}
                        required 
                        />
                </div>
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

                <button className="btn" onClick={handleChangePassword}>Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword