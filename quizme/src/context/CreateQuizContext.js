import React, { useState, useEffect} from "react";


export const CreateQuizContext = React.createContext()

export const CreateQuizContextProvider = ({children}) => {

    const [questions, setQuestions] = useState(JSON.parse(window.localStorage.getItem('questions')) || [])   
    const [answers, setAnswers] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
    const [category, setCategory] = React.useState("None")
    const [title, setTitle] = React.useState("")
    const [currentQuestion, setCurrentQuestion] = useState({
        id: 1,
        questionText: "",
        answers: answers,
    })
    const [error, setError] = useState("")
    const [editExistingQuiz, setEditExistingQuiz] = useState(false)

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

    
    useEffect(() => {
        localStorage.setItem('category', JSON.stringify(category));
    }, [category]);
    
    useEffect(() => {
        localStorage.setItem('quizTitle', JSON.stringify(title));
    }, [title]);
        
    function deleteFromLocalStorage() {
        console.log("handelDeletefromls")
        localStorage.removeItem("active");
        localStorage.removeItem("questions");
        localStorage.removeItem("quizTitle");
        localStorage.removeItem("category");
    }
    
    const handledelete = () => {
        console.log("handledelete")
        deleteFromLocalStorage()
    }

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
                setEditExistingQuiz,
                setCategory,
                setTitle,
                deleteFromLocalStorage,
                handledelete,
                category,
                answers, 
                questions, 
                currentQuestion, 
                error,
                editExistingQuiz,
                title
            }}>
            {children}
        </CreateQuizContext.Provider>
    )
}