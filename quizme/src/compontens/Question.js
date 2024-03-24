import React from "react";
import Answer from "./Answer"

export default function Question({fromActivate, quizTitle, quizImage, numberOfQuestions, quizText, answers, checkedAnswer, currentQuestionIndex, onChangeAnswer}) {

    return (
            <div className="question--card">
                <h1 className="question--text">{quizText}</h1>
                <form>
            {fromActivate ? answers.map((answer, answerIndex) => (
                <Answer key={answerIndex} answerText={answer.text} checkedAnswer={answer.isCorrect} fromActivate={fromActivate}/>)) 
            : answers.map((answer, answerIndex) => (
                <Answer key={answerIndex} answerText={Object.values(answer)[0]} answerIndex={answerIndex} onChangeAnswer={onChangeAnswer} checkedAnswer={checkedAnswer} currentQuestionIndex={currentQuestionIndex} fromActivate={fromActivate}/>)) 
            }           
                </form>
            </div>
    )
}