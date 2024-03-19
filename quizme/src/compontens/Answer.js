import React from "react";

export default function Answer({onChangeAnswer, answerText, answerIndex, checkedAnswer}) {

    const handleChange = (event) => {
        onChangeAnswer(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>
            {answerText !== null && (
            <label className="answers--container">{answerText}
                <input 
                    name="answers"
                    key={answerIndex}
                    type="radio"
                    id={answerText}
                    value={answerText}
                    onChange={handleChange}
                    checked={checkedAnswer === answerText ? true : false}
                />
                <span className="radioBtn"></span>
            </label>
        )}
    </div>
    )
}
