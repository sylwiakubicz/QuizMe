import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import "../styles/quizQuestionCard.css"
import Answer from "./Answer"
import QuizQuestionInfo from "./QuizQuestionInfo"
import QuizScoreCard from "./QuizScoreCard"

export default function QuizQuestionCard() {
    const quizID = useLocation().pathname.split("/")[1]
    
    const [currentIndex, setCurrentIndex] = useState(0)
    const [questions, setQuestions] = useState([])
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)

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


    const handleAnswerChange = (answerText) => {
        setCurrentAnswer(answerText)
        return answerText
    }

    const handleNextQuestion = () => {
        setCurrentIndex((prevIndex) => {
            if ((prevIndex + 1) < questions.length) {
                return (prevIndex + 1)
            }
            else {
                //
                setCurrentIndex(0)
                setShowScore(true)
            }
        });
    };

    const handleTryAgain = () => {
        setCurrentAnswer("")
        setScore(0)
        setShowScore(false)
    }

    return (
        <div>
            {showScore  
            ?  <div>
                {questions.length > 0 && currentIndex === 0 && <QuizScoreCard resetFunction={handleTryAgain} quizTitle={questions[currentIndex].quizTitle} quizScore={score} />}
            </div>
            : (<div className="question--container"> 
                {questions.length > 0 && (
            <div>
                <QuizQuestionInfo quizTitle={questions[currentIndex].quizTitle} quizImage={questions[currentIndex].quizImage}/>
                <div className="question--card">
                    <h1 className="question--text">{questions[currentIndex].question}</h1>
                    <form>
                        {questions[currentIndex].answers.map((answer, answerIndex) => (
                            <Answer key={answerIndex} answerText={Object.values(answer)[0]} answerIndex={answerIndex} onChangeAnswer={handleAnswerChange}/>
                        ))}                    
                    </form>
                </div>
                <button className="quiz--btn" onClick={handleNextQuestion}>Next Question</button>
            </div>)}
            </div>
            )}
    </div>
    )
}