import React from "react";


export default function Activate(props) {

    return (
        <div className={props.active === "activate" ? "settings-container" : "notShow"}>
        </div>
    )
}