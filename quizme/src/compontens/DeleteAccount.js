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
        <div className="buttons-container">
            <button className="quiz--btn delete-btn" onClick={() => props.setShow(false)}>Cancel</button>
            <button className="quiz--btn delete-btn" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default DeleteAccount