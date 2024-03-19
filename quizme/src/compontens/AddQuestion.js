import React from "react";
import AddQuestionCard from "./AddQuestionCard";



export default function AddQuestion(props) {

    
    return (
        <div className="question">
           <AddQuestionCard active={props.active}/>

            <div className={props.active === "addQuestion" ? "settings-container createdQuestion" : "notShow"}>
                <div className="icons">
                    <i className="fa-solid fa-up-down"></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash"></i>
                </div>
                <h2>Treść pytania</h2>
                <p className="correctAnswer">Odp 1</p>
                <p className="wrongAnswer">Odp 2</p>
                <p className="wrongAnswer">Odp 3</p>
                <p className="wrongAnswer">Odp 4</p>
            </div>

            <div className="buttons-container settings-container">
                <button className="quiz--btn delete-btn" >Previous</button>
                <button className="quiz--btn delete-btn" >Continue</button>
            </div>
        </div>
    )
}