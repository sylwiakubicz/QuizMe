import React, { useState } from "react";


export const CreateQuizContext = React.createContext()

export const CreateQuizContextProvider = ({children}) => {

    const [questions, setQuestions] = useState([])

    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAnswerChange = (index, text) => {
        const newAnswers = [...answers];
        newAnswers[index].text = text;
        setAnswers(newAnswers);
    };

    const addAnswer = () => {
        setAnswers([...answers, { text: '', isCorrect: false }]);
    };

    const toggleCorrect = (index) => {
        const newAnswers = answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index ? true : false,
        }));
        setAnswers(newAnswers);
        console.log(answers)
    };
    

    const onDelBtnClick = (index) => {
        console.log(index)
        setAnswers(oldValues => {
          return oldValues.filter((_, i) => i !== index)
        })
    }
    
    const handleQuestionSave = (questionText, answers) => {
        const currentQuestion = [{
            id: questions.length,
            question: questionText,
            answers: answers,
        }]
        setQuestions(prev => prev.concat(currentQuestion))
    }

    return (
        <CreateQuizContext.Provider value={{toggleCorrect, onDelBtnClick, handleAnswerChange, addAnswer, handleQuestionChange, handleQuestionSave, answers, question, questions}}>
            {children}
        </CreateQuizContext.Provider>
    )
}