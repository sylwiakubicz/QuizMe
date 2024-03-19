import React from "react";

export default function CreatedQuestions(props) {
    return(
        <div className={props.active === "addQuestion" ? "settings-container" : "notShow"}>
            <div>
                <h1 className="text-header text-center">Add question</h1>
                <input className="question-input" placeholder="Write a question"></input>

                <div className="buttons-container">
                    <button className="quiz--btn delete-btn" >Previous</button>
                    <button className="quiz--btn delete-btn" >Continue</button>
                </div>
            </div>
        </div>
    )
}