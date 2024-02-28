import React from "react"
import { AuthContext } from "../context/authContext"
import {Link} from "react-router-dom"




function DeleteAccount(props) {

    const {deleteAccount} = React.useContext(AuthContext)

    return (
        <div className="buttons-container">
            <button className="quiz--btn delete-btn" onClick={() => props.setShow(false)}>Cancel</button>
            <Link to="/SignIn"><button className="quiz--btn delete-btn" onClick={deleteAccount}>Delete</button></Link>
        </div>
    )
}

export default DeleteAccount