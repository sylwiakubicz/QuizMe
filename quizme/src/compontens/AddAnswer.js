import React from "react";
import Answer from "./Answer"
import { CreateQuizContext } from "../context/CreateQuizContext";


export default function AddAnswer(props) {

    const inputChange = (e) => {
        props.handleChange(props.index - 1, e.target.value)
    };
    return (
        <div className="addAnswer-container" >
            <Answer />
            <input placeholder={`answer ${props.index}`} name={`answer${props.index}`} value={props.value} onChange={inputChange}></input>
            <button id={props.id} className={props.delete ? "" : "notShow"} onClick={props.onDelBtnClick}><i className="fa-solid fa-trash"></i></button>
        </div>
    )
}