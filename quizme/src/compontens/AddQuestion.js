import React from "react";
import AddQuestionCard from "./AddQuestionCard";
import CreatedQuestionCard from "./CreatedQuestionCard";
import { CreateQuizContext } from "../context/CreateQuizContext";

import {DndContext, closestCorners} from "@dnd-kit/core"
import {SortableContext, arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable"



export default function AddQuestion(props) {
    const {questions, deleteQuestion, editQuestion, setQuestions} = React.useContext(CreateQuizContext)

    const getQuestionPos = (id) => questions.findIndex(question => question.id === id)
    const handleDragEnd = event => {
        const {active, over} = event

        if (active.id === over.id) return

        setQuestions((questions) => {
            const orginalPos = getQuestionPos(active.id)
            const newPos = getQuestionPos(over.id)
            return arrayMove(questions, orginalPos, newPos)
        })
    }

    return (
        <div className={props.active === "addQuestion" ? "question" : "notShow"}>
        <AddQuestionCard active={props.active}/>
            
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={questions} strategy={verticalListSortingStrategy}>
                    {
                        questions.map((q, q_index) => <CreatedQuestionCard key={q_index} active={props.active} questionText={q.questionText} answers={q.answers} onDelete={() => deleteQuestion(q_index)} onEdit={() => editQuestion(q_index)} id={q.id}/>)
                    }
                </SortableContext>
        </DndContext>

            <div className="buttons-container settings-container">
                <button className="quiz--btn delete-btn" onClick={(e) => {
                    e.preventDefault()
                    props.setActive("")
                    }}>Previous</button>
                <button className="quiz--btn delete-btn" onClick={(e) => {
                    e.preventDefault()
                    props.setActive("setPreferences")
                    }}>Continue</button>
            </div>
        </div>
    )
}