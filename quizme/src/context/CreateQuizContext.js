import React, { useState, useEffect} from "react";


export const CreateQuizContext = React.createContext()

export const CreateQuizContextProvider = ({children}) => {

    const [questions, setQuestions] = useState(JSON.parse(window.localStorage.getItem('questions')) || [])   
    const [answers, setAnswers] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
    const [currentQuestion, setCurrentQuestion] = useState({
        id: 1,
        questionText: "",
        answers: answers,
    })
    const [error, setError] = useState("")

    const isEdit = React.useRef(false)
    

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

    useEffect(() => {
    }, [error]);


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
    

    const validateQuestion = () => {
        if (currentQuestion.questionText === "") {
            setError("The question content field cannot be empty")
            return true
        }

        let selectedAnswer = false
        for (let i = 0; i < answers.length; i++ ) {
            if (answers[i].text === "" ){
                setError("The answer field cannot be empty")
                return true
            }
            if (answers[i].isCorrect === true) {
                selectedAnswer = true
            }
        }

        if (!selectedAnswer) {
            setError("Choose which answer is correct")
            return true
        }
        setError("")
        return false

    }

    const handleQuestionSave = () => {
        const isError = validateQuestion();
        
        if(isError) {
            return
        }

        if (isEdit.current) {
            saveEditedQuestion(currentQuestion.id)
            return true
        }
        setQuestions(prev => [...prev, {...currentQuestion, id: prev.length + 1}])
        return true
    }

    const handleSaveBtn = () => {
        isEdit.current = true
    }

    const handleAddNextQuestion = () => {
        const newId = questions.length + 1;
        const initialAnswers = [{ text: '', isCorrect: false }, { text: '', isCorrect: false }]
        setAnswers(initialAnswers)
        setCurrentQuestion({
            id: newId,
            questionText: "",
            answers: initialAnswers,
        })
        isEdit.current = false
    }

    const deleteQuestion = (index) => {
        setQuestions(currentQuestions => {
            const updatedQuestions = currentQuestions.filter((_, i) => i !== index)
                .map((question, newIndex) => ({ ...question, id: newIndex + 1 })); 
            saveInLocalStorage(updatedQuestions);
            return updatedQuestions;
    })}

    const editQuestion = (index) => {
        const questionId = questions[index].id;
        isEdit.current = true
        setAnswers(questions[index].answers)

        setCurrentQuestion({
            id: questionId,
            questionText: questions[index].questionText,
            answers: questions[index].answers,
        })
    }

    const saveEditedQuestion = (id) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = prevQuestions.map(question => {
                if (question.id === id) {
                    return { ...currentQuestion };

                }
                return question;
            });
            return updatedQuestions;
        })
    }



    function saveInLocalStorage(questions) {
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    function deleteFromLocalStorage() {
        localStorage.removeItem("questions");
    }
    // deleteFromLocalStorage()


    return (
        <CreateQuizContext.Provider value={
            {
                toggleCorrect, 
                onDelBtnClick, 
                handleAnswerChange,
                addAnswer, 
                handleQuestionChange, 
                handleQuestionSave, 
                handleAddNextQuestion, 
                editQuestion, 
                deleteQuestion, 
                handleSaveBtn, 
                setQuestions,
                answers, 
                questions, 
                currentQuestion, 
                error
            }}>
            {children}
        </CreateQuizContext.Provider>
    )
}