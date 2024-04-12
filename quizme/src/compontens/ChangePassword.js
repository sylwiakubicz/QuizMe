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


    const handleChangePassword = async (e) => {
        e.preventDefault()
        const error = await changePassword(inputs);
        if (!error) {
            navigate("/SignIn");
        }
    }

    return (
        <div className={props.active === "changePassword" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">CHANGE PASSWORD</h1>
            <p>When you change your password you will be asked to sign in again</p>
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