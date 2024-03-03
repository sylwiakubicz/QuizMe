import React from "react";
import { AuthContext } from "../context/authContext"


function ChangeUserData(props) {

    const {currentUser} = React.useContext(AuthContext)

    const [inputs, setInputs] = React.useState({
        email: currentUser.email,
        username: currentUser.username,
    })

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleSave = (e) => {
        e.preventDefault()
        console.log("Save")
    }

    return (
        <div className={props.active === "accountSettings" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">ACCOUNT SETTINGS</h1>
            <form className="wrapper">
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="email" 
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        required 
                        />
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username"
                        value={inputs.username}
                        onChange={handleChange}
                        required 
                        />
                </div>
                
                <button className="btn" onClick={handleSave}>Save</button>
            </form>
        </div>
    )
}

export default ChangeUserData