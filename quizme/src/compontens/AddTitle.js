import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";

export default function AddTitle(props) {

    const {title, setTitle} = React.useContext(CreateQuizContext)

    return (
        <div className={props.active === "" ? "settings-container center-container" : "notShow"}>
            <h1 className="text-header">Let's start!</h1>
            <p className="paragraph">Create your own quiz for free. Start by giving it a name. Don't worry, you can change this later.</p>
            <form className="wrapper">
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Quiz title" 
                        name="quiztitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {props.error ? <p className="error">{props.error}</p> : null}
                <button className="btn" onClick={(e) => {
                    e.preventDefault()
                    if (props.title === "") {
                        props.setError("Field can not be empty")
                    } else {
                        props.setError("")
                        props.setActive("addQuestion")
                    }
                }}>Continue</button>
            </form>
        </div>
    )
}