import React, {useState} from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "./DeleteConfirm";



function DeleteAccount(props) {

    const {deleteAccount} = React.useContext(AuthContext)
    const navigate = useNavigate()


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = () => {
        deleteAccount()
        navigate("/SignIn")
    }

    return (
        <div className={props.active === "deleteAccount" ? "settings-container" : "notShow"}>
            <h1 className="accountSetingsOption">DELETE ACCOUNT</h1>
            <p className="accountSettingsInfo">All your statistics, quiz, questions and result will be deleted. You can not undo this action.</p>
            <button className="quiz--btn delete-btn" onClick={handleShow}>DELETE</button>
            <DeleteConfirm handleDelete={onDelete} handleClose={handleClose} showModal={show} message={"Your account will be deleted permamently"}/>
        </div>
        
    )
}

export default DeleteAccount