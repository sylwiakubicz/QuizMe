import React from "react";
import { useState } from "react";

export default function Answer(props) {

    const [answerText, setAnswetText] = useState(props.answerText)

    const handleChange = (event) => {
        setAnswetText(event.target.value)
        props.onChangeAnswer(answerText)
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
                />
                <span className="radioBtn"></span>
            </label>
        )}
    </div>
    )
}
