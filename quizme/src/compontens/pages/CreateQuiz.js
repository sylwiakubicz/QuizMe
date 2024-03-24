import React, {useEffect} from "react";
import AddQuestion from "../AddQuestion";

import "../../styles/AddQuiz.css"
import AddTitle from "../AddTitle";
import SetPreferences from "../SetPreferences";
import Activate from "../Activate"


export default function CreateQuiz() {

    const [active, setActive] = React.useState(JSON.parse(window.localStorage.getItem('active')) || "")
    const [title, setTitle] = React.useState(JSON.parse(window.localStorage.getItem('quizTitle')) || "")
    const [error, setError] = React.useState("")

    useEffect(() => {
        localStorage.setItem('quizTitle', JSON.stringify(title));
    }, [title]);

    useEffect(() => {
        localStorage.setItem('active', JSON.stringify(active));
    }, [active]);

    return(
        <div className="myaccount-container page">
            {title && active ? <h1 className="text">{title}</h1> : <h1 className="text">Create a quiz</h1>}
            <div className="account-wrapper">
                <div className="options">
                    <li className={active === "addQuestion" ? "option option-bigger active" : "option option-bigger"}>Add question</li>
                    <li className={active === "setPreferences" ? "option option-bigger active" : "option option-bigger"}>Set preferences</li>
                    <li className={active === "activate" ? "option option-bigger active" : "option option-bigger"}>Acivate</li>
                </div>
                
                <AddTitle active={active} title={title} setError={setError} setActive={setActive} error={error} setTitle={setTitle}/>
                <AddQuestion active={active} titile={title} setActive={setActive} />
                <SetPreferences active={active} titile={title} setActive={setActive}/>
                <Activate active={active} titile={title} setActive={setActive}/>
            </div>
        </div>
    )
}