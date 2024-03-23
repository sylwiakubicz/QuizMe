import React from "react";
import { CreateQuizContext } from "../context/CreateQuizContext";
import AddAnswer from "../compontens/AddAnswer"

export default function AddQuestionCard({active}) {
    const {toggleCorrect, onDelBtnClick, handleAnswerChange, addAnswer, handleQuestionChange, handleQuestionSave, handleAddNextQuestion, handleSaveBtn, answers, currentQuestion} = React.useContext(CreateQuizContext)
    
    const handleSave = () => {
        handleQuestionSave()
        handleSaveBtn()
    }

    const handleNextQuestion = () => {
        handleQuestionSave()
        handleAddNextQuestion()
    }

    return (
    <div className={active === "addQuestion" ? "settings-container" : "notShow"}>
        <div className="question">
            <h1 className="text-header text-center">Add question</h1>
            <input 
                className="question-input" 
                placeholder="Write a question"
                value={currentQuestion.questionText}
                onChange={handleQuestionChange}
            ></input>
            
            {
                answers.map((answer, index) => (
                    <AddAnswer 
                        key={index} 
                        index={index}
                        delete={index > 1 ? true : false} 
                        value={answer.text}
                        onDelBtnClick={() => onDelBtnClick(index)} 
                        handleChange={handleAnswerChange}
                        checked={answer.isCorrect}
                        handleChecked={toggleCorrect}
                    /> 
                ))
            }
            
            <button className="moreAnswers" onClick={addAnswer}>+</button>
            
            <div className="buttons-container">
                <button className="quiz--btn delete-btn" onClick={handleSave}>Save</button>
                <button className="quiz--btn delete-btn" onClick={handleNextQuestion}>Next question</button>
            </div>

        </div>
    </div>
    )
}