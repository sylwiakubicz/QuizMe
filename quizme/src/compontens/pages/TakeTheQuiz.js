import React, { useEffect, useState, useRef, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import "../../styles/quizQuestionCard.css"
import Question from "../Question"
import QuizScoreCard from "../QuizScoreCard"
import QuizQuestionInfo from "../QuizQuestionInfo"

import {AuthContext} from "../../context/authContext"



export default function TakeTheQuiz() {
    const navigate = useNavigate()
    const quizID = useLocation().pathname.split("/")[1]
    const {currentUser, logout} = useContext(AuthContext)

    const [error, setError] = useState("")
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [showScore, setShowScore] = useState(false)
    const score = useRef(0)

    const [isLoading, setIsLoading] = React.useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {const res = await axios.get(`/quiz/${quizID}`, {
                withCredentials:true,
            })
            setQuestions(res.data)
            setIsLoading(false)
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

    const setUserScore = async () => {
        const userID = currentUser ? currentUser.id : null
        if (!userID) {
            return console.log("not logged in")
        } else {
            try {
                const res = await axios.get(`/quiz/${quizID}/score?userID=${userID}`, {
                    withCredentials:true,
                })
                if (res.data.length === 0) {
                    try {
                        await axios.post(`/quiz/${quizID}`, {
                            quizScore: score.current,
                            userID: userID,
                        })
                    } catch (err) {
                        console.log(err)
                    }
                } 
                else if (res.data[0].score < score.current) {
                    try{
                        await axios.put(`/quiz/${quizID}`, {
                            quizScore: score.current,
                            userID: userID
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            } catch (err) {
                if (err.response.data === "Token is not valid") {
                    logout()
                    navigate("/SignIn")
                }
            }
        }

    }

    const handleAnswerChange = (answerText) => {
        setCurrentAnswer(answerText)
        setError("")
        return answerText
    }

    const handleNextQuestion = (correctAnswer, quizStats) => {
        if (currentAnswer === "") {
            setError("Choose an answer to continue")
            return
        }

        if (currentAnswer === correctAnswer) {
            score.current += 1
        }

        if(currentIndex + 1 < questions.length) {
            setCurrentIndex(prevIndex => prevIndex + 1)
        }
        else {
            quizStats += 1
            sendStats(quizStats)
            setUserScore()
            setCurrentIndex(0)
            setShowScore(true)
        }

        setCurrentAnswer("")
    };


    const handleTryAgain = () => {
        setCurrentAnswer("")
        score.current = 0
        setShowScore(false)
    }
    
    return (
        <div> 
            {isLoading ?
                <div className="myaccount-container">
                        <p className="text ">Loading...</p> 
                </div>
                :
                showScore  ?  <div>
                    {questions.length > 0 && currentIndex === 0 && <QuizScoreCard resetFunction={handleTryAgain} quizTitle={questions[currentIndex].quizTitle} quizScore={score.current} quizLenght={questions.length}/>}
                </div>
                : <div className="question--container"> 

                    {questions.length > 0 && (
                        <div >
                            <QuizQuestionInfo quizTitle={questions[currentIndex].quizTitle} quizImage={questions[currentIndex].quizImage} numberOfQuestions={questions.length}/>
                            <Question 
                                quizText={questions[currentIndex].question}
                                answers={questions[currentIndex].answers}
                                checkedAnswer={currentAnswer}
                                currentQuestionIndex={currentIndex}
                                onChangeAnswer={handleAnswerChange}
                                fromActivate={false}
                                />
                        </div>
                        )}
                    {error && <div className="quiz--error">{error}</div>}
                    <button className="quiz--btn" onClick={() => handleNextQuestion(questions[currentIndex].correctAnswer, questions[currentIndex].quizStats)}>Next Question</button>
                </div>
            }
       </div>
    )
}