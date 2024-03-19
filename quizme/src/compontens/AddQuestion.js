import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";
import AddAnswer from "../compontens/AddAnswer"


export default function AddQuestion(props) {

    const {answers, questions, onAddBtnClick, onDelBtnClick, handleAnswerChange} = React.useContext(CreateQuizContext)
    
    return (
        <div className="question">
            <div className={props.active === "addQuestion" ? "settings-container" : "notShow"}>
                <div className="question">
                    <h1 className="text-header text-center">Add question</h1>
                    <input 
                        className="question-input" 
                        placeholder="Write a question"
                    ></input>
                    
                    {
                        answers.map((answer, a_index) => (
                            <AddAnswer 
                                key={a_index} 
                                index={a_index + 1} 
                                delete={a_index > 1 ? true : false} 
                                value={Object.values(answer)[0]}
                                onDelBtnClick={() => onDelBtnClick(a_index)} 
                                handleChange={handleAnswerChange}
                            /> 
                        ))
                    }
                    

                    <button className="moreAnswers" onClick={onAddBtnClick}>+</button>
                    <div className="buttons-container">
                        <button className="quiz--btn delete-btn" >Previous</button>
                        <button className="quiz--btn delete-btn" >Continue</button>
                    </div>
                </div>
            </div>

            <div className={props.active === "addQuestion" ? "settings-container createdQuestion" : "notShow"}>
                <div className="icons">
                    <i className="fa-solid fa-up-down"></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash"></i>
                </div>
                <h2>Treść pytania</h2>
                <p className="correctAnswer">Odp 1</p>
                <p className="wrongAnswer">Odp 2</p>
                <p className="wrongAnswer">Odp 3</p>
                <p className="wrongAnswer">Odp 4</p>
            </div>
        </div>
    )
}