import React from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom";



function DeleteAccount(props) {

    const {deleteAccount} = React.useContext(AuthContext)
    const navigate = useNavigate()

    const onDelete = () => {
        deleteAccount()
        navigate("/SignIn")
    }
    return (
        <div className={props.active === "deleteAccount" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">DELETE ACCOUNT</h1>
            <p className="accountSettingsInfo">All your statistics, quiz, questions and result will be deleted. You can not undo this action.</p>
            {!props.show && <button className="quiz--btn delete-btn" onClick={() => props.setShow(true)}>DELETE</button>}
            {props.show && <div className="buttons-container">
                        <button className="quiz--btn delete-btn" onClick={() => props.setShow(false)}>Cancel</button>
                        <button className="quiz--btn delete-btn" onClick={onDelete}>Delete</button>
                    </div>}
        </div>
        
    )
}

export default DeleteAccount