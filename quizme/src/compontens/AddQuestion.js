import React from "react";
import AddQuestionCard from "./AddQuestionCard";
import CreatedQuestionCard from "./CreatedQuestionCard";
import { CreateQuizContext } from "../context/CreateQuizContext";




export default function AddQuestion(props) {
    const {questions} = React.useContext(CreateQuizContext)

    return (
        <div className="question">
           <AddQuestionCard active={props.active}/>
            
            {
                questions.map((q, q_index) => <CreatedQuestionCard key={q_index} active={props.active} questionText={q.question} answers={q.answers}/>)
            }

            <div className="buttons-container settings-container">
                <button className="quiz--btn delete-btn" >Previous</button>
                <button className="quiz--btn delete-btn" >Continue</button>
            </div>
        </div>
    )
}