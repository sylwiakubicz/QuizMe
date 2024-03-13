import React from "react";
import AddAnswer from "./AddAnswer"

export default function AddQuestion(props) {

    const [error, setError] = React.useState("")

    return (
        <div className={props.active === "addQuestion" ? "settings-container" : "notShow"}>
            <h1 className="text-header text-center">Add question</h1>
            <input className="question-input" placeholder="Write a question"></input>
            <AddAnswer />
            <AddAnswer />
            <AddAnswer />
            <AddAnswer />
            <AddAnswer />
            <button className="moreAnswers">+</button>

        </div>
    )
}