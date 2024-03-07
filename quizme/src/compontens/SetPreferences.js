import React from "react";


export default function setPreferences(props) {

    return (
        <div className={props.active === "setPreferences" ? "settings-container" : "notShow"}>
        </div>
    )
}