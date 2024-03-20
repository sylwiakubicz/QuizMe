import React from "react";
import AddQuestion from "../AddQuestion";

import "../../styles/AddQuiz.css"
import AddTitle from "../AddTitle";


export default function CreateQuiz() {

    const [active, setActive] = React.useState("addQuestion")
    const [title, setTitle] = React.useState("test")
    const [error, setError] = React.useState("")

    return(
        <div className="myaccount-container">
            {title && active ? <h1 className="text">{title}</h1> : <h1 className="text">Create a quiz</h1>}
            <div className="account-wrapper">
                <div className="options">
                    <li className={active === "addQuestion" ? "option option-bigger active" : "option option-bigger"}>Add question</li>
                    <li className={active === "setPreferences" ? "option option-bigger active" : "option option-bigger"}>Set preferences</li>
                    <li className={active === "activate" ? "option option-bigger active" : "option option-bigger"}>Acivate</li>
                </div>
                
                <AddTitle active={active} title={title} setError={setError} setActive={setActive} error={error} setTitle={setTitle}/>
                <AddQuestion active={active} titile={title} setError={setError} setActive={setActive} error={error}/>
                {/* <SetPreferences active={active} titile={title}/>
                <Activate active={active} titile={title}/> */}
            </div>
        </div>
    )
}