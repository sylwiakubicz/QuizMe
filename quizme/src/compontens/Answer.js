import React from "react";

export default function Answer(props) {

    const handleChange = (event) => {
        props.onChangeAnswer(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>
            {props.answerText !== null && (
            <label className="answers--container">{props.answerText}
                <input 
                    name="answers"
                    key={props.answerIndex}
                    type="radio"
                    id={props.answerText}
                    value={props.answerText}
                    onChange={handleChange}
                    checked={props.checkedAnswer === props.answerText ? true : false}
                />
                <span className="radioBtn"></span>
            </label>
        )}
    </div>
    )
}
