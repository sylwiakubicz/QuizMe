import React, {useState} from "react";
import { AuthContext } from "../context/authContext"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "./DeleteConfirm";



function ChangeUserData(props) {

    const {currentUser, logout} = React.useContext(AuthContext)

    const [inputs, setInputs] = React.useState({
        email: currentUser.email,
        username: currentUser.username,
        userID: currentUser.id
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => { 
        e.preventDefault()
        setShow(true)
    }

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
        handleClose()
    }

    return (
        <div className={props.active === "accountSettings" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">ACCOUNT SETTINGS</h1>
            <p>After some changes you will be asked to sign in again</p>
            <form className="wrapper myProfileFormWrapper">
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
                
                <button className="btn" onClick={handleShow}>Save</button>
                <DeleteConfirm changeData={true} handleDelete={handleSave} handleClose={handleClose} showModal={show} message={"Your credential will be changed. You will be asked to sign in again."}/>

            </form>
        </div>
    )
}

export default ChangeUserData