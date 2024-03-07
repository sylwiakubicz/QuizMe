import React from "react";


export default function AddQuestion(props) {

    return (
        <div className={props.active === "addQuestion" ? "settings-container" : "notShow"}>
        </div>
    )
}