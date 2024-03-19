import React from "react";


export const CreateQuizContext = React.createContext()

export const CreateQuizContextProvider = ({children}) => {

    const [questions, setQuestions] = React.useState(
        [
            {
            question: "",
            answers: [],
            correctAnswer: ""
            }
    ])

    const [answers, setAnswers] = React.useState(
        [
            {answer1: ""},
            {answer2: ""},
        ]
    )

    const onAddBtnClick = e => {
        if (answers.length >= 5) return
        const answerKey = `answer${answers.length + 1}`;
        setAnswers(answers.concat([{[answerKey]: ""}]));
    };


    const handleAnswerChange = (index, newValue) => {
        setAnswers(oldValues => oldValues.map((item, i) => {
            const answerKey = `answer${i + 1}`; // Generowanie klucza na podstawie indeksu
            if (i === index) {
                return { [answerKey]: newValue };
            } else {
                return item;
            }
        }))
    }


    const onDelBtnClick = (index) => {
        console.log(index)
        setAnswers(oldValues => {
          return oldValues.filter((_, i) => i !== index)
        }) 
    }
    
    return (
        <CreateQuizContext.Provider value={{ onAddBtnClick, onDelBtnClick, handleAnswerChange, answers, questions}}>
            {children}
        </CreateQuizContext.Provider>
    )
}