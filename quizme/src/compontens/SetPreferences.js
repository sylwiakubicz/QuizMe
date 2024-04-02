import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";


export default function SetPreferences(props) {

    
    const {category, setCategory, title, setTitle} = React.useContext(CreateQuizContext)

    return (
        <div className={props.active === "setPreferences" ? "settings-container" : "notShow"}>

            <h1>Choose a category: </h1>
            <select id="category" name="category" className="categoryDropList categoryDropListCreateQuiz" onChange={e => {setCategory(e.target.value)}} value={category}>
                <option className="option" value="None" defaultChecked>None</option>
                <option className="option" value="general">General knowledge</option>
                <option className="option" value="celebrity">Celebrity</option>
                <option className="option" value="personality">Personality</option>
                <option className="option" value="science">Science</option>
                <option className="option" value="geography">Geography</option>
            </select>
                    
            <h1>Change the title:  </h1>
            <div className="input-box">
                <input 
                    type="text" 
                    placeholder="Quiz title" 
                    name="quiztitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <h1>Add quiz image: </h1>
            <input type="file"></input>


                    

            <div className="buttons-container padding-top">
                <button className="quiz--btn delete-btn" onClick={(e) => {
                e.preventDefault()
                props.setActive("addQuestion")
                }}>Previous</button>
                <button className="quiz--btn delete-btn" onClick={(e) => {
                    e.preventDefault()
                    props.setActive("activate")
                }}>Continue</button>
            </div>
            
        </div>
    )
}