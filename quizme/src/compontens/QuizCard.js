import React, {useState} from "react"
import img from "../images/randomImg.jpg"
import "../styles/quizCard.css"
import {Link} from "react-router-dom"
import {AuthContext} from "../context/authContext"
import {QuizContext} from "../context/quizContext"
import DeleteConfirm from "./DeleteConfirm"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { CreateQuizContext } from "../context/CreateQuizContext"



export function QuizCard(props) {

    const {currentUser} = React.useContext(AuthContext)
    const {deleteQuiz} = React.useContext(QuizContext)
    const {setEditExistingQuiz, questions, setQuestions, setTitle, setCategory} = React.useContext(CreateQuizContext)

    const message = `Your quiz "${props.title}" will be deleted permamently`
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const navigate = useNavigate()

    const fetchData = async (quiz_id) => {
        try {const res = await axios.get(`/quiz/${quiz_id}`, {
            withCredentials:true,
        })

        res.data.map(item => {
            setQuestions(prev => {return [
                ...prev,
                {
                    id: item.question_id,
                    questionText: item.question,
                    answers: item.answers.map(answer => {return [
                        {
                            text: Object.values(answer)[0],
                            isCorrect: Object.values(answer)[0] === item.correctAnswer ? true : false
                        }
                    ]})
                }
            ]})
            setTitle(res.data[0].quizTitle)
            setCategory(res.data[0].category)
            navigate("/createquiz")
        })
    } catch (err) {
        console.log(err)
    }}

    const handleEdit = (quiz_id) =>{
        setEditExistingQuiz(true)
        fetchData(quiz_id)
        console.log(questions)
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
                    <i className="fa-solid fa-pen-to-square quizCard-icon" onClick={() => handleEdit(props.id)}></i>
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