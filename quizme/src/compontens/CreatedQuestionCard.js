import { useSortable } from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import React from "react"

export default function CreatedQuestionCard({id, onEdit, onDelete, questionText, answers, active}) {

    const {attributes, listeners, setNodeRef, transform} = useSortable({id})

    const style ={
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div style={style} className={active === "addQuestion" ? "settings-container createdQuestion" : "notShow"}>
                <div className="icons">
                    <i className="fa-solid fa-up-down" ref={setNodeRef}  {...attributes} {...listeners}  ></i>
                    <i className="fa-solid fa-pen-to-square" onClick={onEdit}></i>
                    <i className="fa-solid fa-trash" onClick={onDelete}></i>
                </div>
                <h2>{questionText}</h2>
                {
                    answers.map((answer, a_index) => <p key={a_index} className={answer.isCorrect ? "correctAnswer" : ""}>{a_index + 1 + ". " + answer.text}</p>)
                }
        </div>
    )
}