import React from "react";
import { AuthContext } from "../context/authContext"
import axios from "axios"
import { useNavigate } from "react-router-dom";


function ChangeUserData(props) {

    const {currentUser, logout} = React.useContext(AuthContext)

    const [inputs, setInputs] = React.useState({
        email: currentUser.email,
        username: currentUser.username,
        userID: currentUser.id
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

    const handleSave = async (e) => {
        e.preventDefault()
        if (currentUser.email !== inputs.email || currentUser.username !== inputs.username) {
            try {await axios.put("/auth/updateuserdata", inputs, {
                withCredentials:true,
            })
            } catch (err){
                console.log(err)
            }
            logout()
            navigate("/SignIn")
        } 
    }

    return (
        <div className={props.active === "accountSettings" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">ACCOUNT SETTINGS</h1>
            <p>After some changes you will be asked to sign in again</p>
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