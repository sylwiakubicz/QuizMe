import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"


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
        <div>
        {questions.length > 0 && (
            <div>
                <p>ID: {questions[currentIndex].id}</p>
                <p>Question: {questions[currentIndex].question}</p>
                <p>Correct Answer: {questions[currentIndex].correctAnswer}</p>
                <ul>
                    {questions[currentIndex].answers.map((answer, answerIndex) => (
                        <li key={answerIndex}>
                            {Object.values(answer)[0]}
                        </li>
                    ))}
                </ul>
                <button onClick={handleNextQuestion}>Next Question</button>
                <button onClick={handleNextQuestion}>Try Again</button>
            </div>
            )}
        </div>
    )
}