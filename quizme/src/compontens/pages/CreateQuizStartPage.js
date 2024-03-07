import React from "react";

export default function CreateQuizStartPage() {

    const [active, setActive] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [error, setError] = React.useState("")

    return(
        <div className="myaccount-container">
            <h1 className="text">Create a quiz</h1>
            <div className="account-wrapper">
                <div className="options">
                    <li className={active === "addQuestion" ? "option option-bigger active" : "option option-bigger"}>Add question</li>
                    <li className={active === "setPreferences" ? "option option-bigger active" : "option option-bigger"}>Set preferences</li>
                    <li className={active === "activate" ? "option option-bigger active" : "option option-bigger"}>Acivate</li>
                </div>
                <div className={active === "" ? "settings-container center-container" : "notShow"}>
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
                        {error ? <p className="error">{error}</p> : null}
                        <button className="btn" onClick={(e) => {
                            e.preventDefault()
                            if (title === "") {
                                setError("Field can not be empty")
                            } else {
                                setError("")
                                setActive("addQuestion")
                            }
                        }}>Continue</button>
                    </form>
                </div>
                {/* 
                <AddQuestion active={active}/>
                <SetPreferences active={active}/>
                <Activate active={active}/> */}
            </div>
        </div>
    )
}