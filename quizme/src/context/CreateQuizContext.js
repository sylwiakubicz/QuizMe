import React, { useState, useEffect} from "react";


export const CreateQuizContext = React.createContext()

export const CreateQuizContextProvider = ({children}) => {

    const [questions, setQuestions] = useState(JSON.parse(window.localStorage.getItem('questions')) || [])   
    const [answers, setAnswers] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
    const [currentQuestion, setCurrentQuestion] = useState({
        id: 0,
        questionText: "",
        answers: answers,
    })

    useEffect(() => {
        setCurrentQuestion(prev => {
            return (
                {
                    ...prev,
                    answers: answers,
                }
            )
        })
    }, [answers]);

    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);




    const handleQuestionChange = (e) => {
        setCurrentQuestion(prev => {
            return (
                {
                    ...prev,
                    questionText: e.target.value,
                }
            )
        })
    };




    const handleAnswerChange = (index, text) => {
        const newAnswers = [...answers];
        newAnswers[index].text = text;
        setAnswers(newAnswers);
    };

    const addAnswer = () => {
        if (answers.length === 5) {
            return
        }
        setAnswers(answers => [...answers, { text: '', isCorrect: false }]);
    };

    const toggleCorrect = (index) => {
        const newAnswers = answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index ? true : false,
        }));
        setAnswers(newAnswers);
    };
    

    const onDelBtnClick = (index) => {
        setAnswers(oldValues => {
          return oldValues.filter((_, i) => i !== index)
        })
    }
    


    const handleQuestionSave = () => {
        if (currentQuestion.questionText === "") {
            console.log("Ad question text")
            return
        }

        let selectedAnswer = false
        for (let i = 0; i < answers.length; i++ ) {
            if (answers[i].text === "" ){
                console.log("Answers cant be empty")
                return
            }
            console.log(answers[i].isCorrect)
            if (answers[i].isCorrect === true) {
                console.log("her")
                selectedAnswer = true
            }
        }

        if (!selectedAnswer) {
            console.log("Check proper answer")
            return
        }

        if (saveEditedQuestion(currentQuestion.id)) {
            return
        }

        setQuestions(prev => [...prev, {...currentQuestion, id: prev.length}])
    }

    const handleAddNextQuestion = () => {
        const initialAnswers = [{ text: '', isCorrect: false }, { text: '', isCorrect: false }]
        setAnswers(initialAnswers)
        setCurrentQuestion({
                id: questions.length,
                questionText: "",
                answers: initialAnswers,
            }
    )}

    const deleteQuestion = (index) => {
        setQuestions(oldValues => {
            return oldValues.filter((_, i) => i !== index)
          })
          saveInLocalStorage(questions)
    }

    const editQuestion = (index) => {
        setAnswers(questions[index].answers)

        setCurrentQuestion({
            id: questions[index].id,
            questionText: questions[index].questionText,
            answers: questions[index].answers,
        })
    }

    const saveEditedQuestion = (id) => {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].id === id) {
                questions.splice(i, 1, currentQuestion)
                return true
            }
        }
    }



    function saveInLocalStorage(questions) {
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    function deleteFromLocalStorage() {
        localStorage.removeItem("questions");
    }
    // deleteFromLocalStorage()


    return (
        <CreateQuizContext.Provider value={{toggleCorrect, onDelBtnClick, handleAnswerChange, addAnswer, handleQuestionChange, handleQuestionSave, handleAddNextQuestion, editQuestion, deleteQuestion, answers, questions, currentQuestion}}>
            {children}
        </CreateQuizContext.Provider>
    )
}