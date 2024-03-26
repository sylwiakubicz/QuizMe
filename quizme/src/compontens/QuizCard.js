import React, {useState} from "react"
import img from "../images/randomImg.jpg"
import "../styles/quizCard.css"
import {Link} from "react-router-dom"
import {AuthContext} from "../context/authContext"
import {QuizContext} from "../context/quizContext"
import DeleteConfirm from "./DeleteConfirm"
import { useNavigate } from "react-router-dom";



export function QuizCard(props) {

    const {currentUser} = React.useContext(AuthContext)
    const {deleteQuiz, setEditExistingQuiz} = React.useContext(QuizContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const message = `Your quiz "${props.title}" will be deleted permamently`

    const handleEdit = () =>{
        setEditExistingQuiz(true)
    }

    return (
<>           
        <div className="quizCard" >
            <Link to={`/${props.id}`}>
                <img 
                    src={img} 
                    alt="" 
                    className="quizImg">
                </img>
                <h2 className="quizTitle">{props.title}</h2>
                <p className="quizStats"><i className="fa-solid fa-chart-simple"></i> {props.stats}</p>
            </Link>
                {props.user_id === currentUser.id && 
                <div className="quizCard-icons">
                    <i className="fa-solid fa-pen-to-square quizCard-icon" onClick={handleEdit}></i>
                    <i className="fa-solid fa-trash quizCard-icon" onClick = {handleShow}></i>
                </div>}
        </div>  
                <DeleteConfirm 
                showModal={show} 
                handleClose = {handleClose} 
                handleDelete = {() => {
                    deleteQuiz(props.id)
                    navigate(0)
                    handleClose()
                }} 
                message={message}
            />
</> 
    )
}