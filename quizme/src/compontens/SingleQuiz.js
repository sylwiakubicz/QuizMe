import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import "../styles/quizQuestionCard.css"

export default function SingleQuiz() {
    const quizID = useLocation().pathname.split("/")[1]
    
    const [currentIndex, setCurrentIndex] = useState(0)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {const res = await axios.get(`/quiz/${quizID}`, {
                withCredentials:true,
            })
            console.log(res.data)
            setQuestions(res.data)
        } catch (err) {
            console.log(err)
        }}
        fetchData()
    }, [quizID])

    const handleNextQuestion = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    return (
        <div className="question--container"> 
        {questions.length > 0 && (
        <div>
            <div className="quiz--info">
                <h1 className="quiz--title">{questions[currentIndex].quizTitle}</h1>
                <hr className="quiz--line"/>
                <div className="quiz--userInfo">
                    <p>User email/username</p>
                    <p>Your best score: 2/3</p>
                </div>
            </div>
            <div className="question--card">
                <h1 className="question--text">{questions[currentIndex].question}</h1>
                <form>
                    {questions[currentIndex].answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                            {Object.values(answer)[0] !== null && (
                                <label className="answers--container">{Object.values(answer)[0]}
                                    <input 
                                        name="answers"
                                        key={answerIndex}
                                        type="radio"
                                        id={Object.values(answer)[0]}
                                        value={Object.values(answer)[0]}    
                                    />
                                    <span className="radioBtn"></span>
                                </label>
                            )}
                        </div>
                    ))}                    
                </form>
            </div>
            {/* <button className="quiz--btn" onClick={handleNextQuestion}>Try Again</button> */}
            <button className="quiz--btn" onClick={handleNextQuestion}>Next Question</button>
        </div>
            )}
        </div>
    )
}