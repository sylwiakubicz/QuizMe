import React from "react";

export default function AddAnswer(props) {


    return (
        <div className="addAnswer-container" >
            <div>
                {props.value !== null && (
                <label className="answers--container">
                    <input 
                        type="radio"
                        onChange={() => props.handleChecked(props.index)}
                        checked={props.checked}
                    />
                    <span className="radioBtn"></span>
                </label>
                )}
            </div>

            <input placeholder={`answer ${props.index + 1}`} value={props.value} onChange={(e) => props.handleChange(props.index, e.target.value)}></input>
            <button id={props.index} className={props.delete ? "" : "notShow"} onClick={props.onDelBtnClick}><i className="fa-solid fa-trash"></i></button>
        </div>
    )
}