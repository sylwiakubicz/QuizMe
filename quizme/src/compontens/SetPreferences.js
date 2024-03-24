import React from "react";


export default function setPreferences(props) {

    return (
        <div className={props.active === "setPreferences" ? "settings-container" : "notShow"}>



            
            <button className="quiz--btn delete-btn" onClick={(e) => {
                e.preventDefault()
                props.setActive("addQuestion")
                }}>Previous</button>
            <button className="quiz--btn delete-btn" onClick={(e) => {
                e.preventDefault()
                props.setActive("activate")
            }}>Continue</button>
        </div>
    )
}