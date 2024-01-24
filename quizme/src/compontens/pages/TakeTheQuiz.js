import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import "../../styles/quizQuestionCard.css"
import Answer from "../Answer"
import QuizQuestionInfo from "../QuizInfo"
import QuizScoreCard from "../QuizScoreCard"

export default function TakeTheQuiz() {
    const quizID = useLocation().pathname.split("/")[1]
    
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {const res = await axios.get(`/quiz/${quizID}`, {
                withCredentials:true,
            })
            setQuestions(res.data)
        } catch (err) {
            console.log(err)
        }}
        fetchData()
    }, [quizID])

    const sendStats = async (quizStats) => {
        try {
            axios.put(`/quiz/${quizID}/stats`, {
                quizStats: quizStats
            }, {
                withCredentials: true,
            })
        } catch (err) {
            console.log(err)
        }
    }

    const getUserScore = async () => {
        try {
            const res = await axios.get(`/quiz/${quizID}/score`)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }

    }

    const handleAnswerChange = (answerText) => {
        setCurrentAnswer(answerText)
        return answerText
    }

    const handleNextQuestion = (correctAnswer, quizStats) => {
        if (currentAnswer === correctAnswer) {
            setScore(prevScore => prevScore + 1)
        }

        if(currentIndex + 1 < questions.length) {
            setCurrentIndex(prevIndex => prevIndex + 1)
        }
        else {
            quizStats += 1
            sendStats(quizStats)
            getUserScore()
            setCurrentIndex(0)
            setShowScore(true)
        }

        setCurrentAnswer("")
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
                {questions.length > 0 && currentIndex === 0 && <QuizScoreCard resetFunction={handleTryAgain} quizTitle={questions[currentIndex].quizTitle} quizScore={score} quizLenght={questions.length}/>}
            </div>
            : (<div className="question--container"> 
                {questions.length > 0 && (
            <div>
                <QuizQuestionInfo quizTitle={questions[currentIndex].quizTitle} quizImage={questions[currentIndex].quizImage}/>
                <div className="question--card">
                    <h1 className="question--text">{questions[currentIndex].question}</h1>
                    <form>
                        {questions[currentIndex].answers.map((answer, answerIndex) => (
                            <Answer key={answerIndex} answerText={Object.values(answer)[0]} answerIndex={answerIndex} onChangeAnswer={handleAnswerChange} checkedAnswer={currentAnswer} currentQuestionIndex={currentIndex}/>
                        ))}                    
                    </form>
                </div>
                <button className="quiz--btn" onClick={() => handleNextQuestion(questions[currentIndex].correctAnswer, questions[currentIndex].quizStats)}>Next Question</button>
            </div>)}
            </div>
            )}
    </div>
    )
}