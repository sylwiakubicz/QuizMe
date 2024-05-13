import React from "react";

export default function Answer({fromActivate, onChangeAnswer, answerText, answerIndex, checkedAnswer}) {

    const handleChange = (event) => {
        onChangeAnswer(event.target.value)
    }

    return (
        <div>
            {answerText !== null && (
            <label className="answers--container">{answerText}
            {fromActivate ?
                <input 
                    name="answers"
                    key={answerIndex}
                    type="radio"
                    id={answerText}
                    value={answerText}
                    checked={checkedAnswer}
                    readOnly
                />
                : 
                <input 
                    name="answers"
                    key={answerIndex}
                    type="radio"
                    id={answerText}
                    value={answerText}
                    onChange={handleChange}
                    checked={checkedAnswer === answerText ? true : false}
                />}
                
                <span className="radioBtn"></span>
            </label>
        )}
    </div>
    )
}
