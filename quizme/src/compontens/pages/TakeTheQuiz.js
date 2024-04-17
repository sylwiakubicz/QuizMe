import React, {useContext} from "react"

import Question from "../Question"
import QuizScoreCard from "../QuizScoreCard"
import QuizQuestionInfo from "../QuizQuestionInfo"

import {AuthContext} from "../../context/authContext"

import { useTakeTheQuiz } from "../../hooks/useTakeTheQuiz"

import "../../styles/quizQuestionCard.css"


export default function TakeTheQuiz() {
    
    const {currentUser} = useContext(AuthContext)
    const [isLoading, showScore, currentIndex, score, prevScore, currentAnswer, error, questions, handleTryAgain, handleNextQuestion, handleAnswerChange] = useTakeTheQuiz(currentUser)
    
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
                            <QuizQuestionInfo quizTitle={questions[currentIndex].quizTitle} quizImage={questions[currentIndex].quizImage} numberOfQuestions={questions.length} userScore={prevScore}/>
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