import React from "react";
import Answer from "./Answer"

export default function AddAnswer() {
    return (
        <div className="addAnswer-container" >
            <Answer />
            <input placeholder="answer 1"></input>
            <button><i className="fa-solid fa-trash"></i></button>
        </div>
    )
}