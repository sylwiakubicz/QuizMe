import { useSortable } from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import React from "react"
import { CreateQuizContext } from "../context/CreateQuizContext"

export default function CreatedQuestionCard({id, onEdit, onDelete, questionText, answers, active}) {

    const {attributes, listeners, setNodeRef, transform} = useSortable({id})

    const style ={
        transform: CSS.Transform.toString(transform),
    }

    const {editExistingQuiz} = React.useContext(CreateQuizContext)

    return (
        <div style={style} className={active === "addQuestion" ? "settings-container createdQuestion" : "notShow"}>
                <div className="icons">
                    <i className="fa-solid fa-up-down" ref={setNodeRef}  {...attributes} {...listeners}  ></i>
                    <i className="fa-solid fa-pen-to-square" onClick={onEdit}></i>
                    <i className="fa-solid fa-trash" onClick={onDelete}></i>
                </div>
                <h2 className="createdQuestionText">{questionText}</h2>
                {editExistingQuiz ? 
                    answers.map((answer, a_index) => answer[0].text !== null && <p key={a_index} className={answer[0].isCorrect ? "correctAnswer" : ""}>{a_index + 1 + ". " + answer[0].text}</p>)
                :
                    answers.map((answer, a_index) => <p key={a_index} className={answer.isCorrect ? "correctAnswer" : ""}>{a_index + 1 + ". " + answer.text}</p>)     
                }
        </div>
    )
}