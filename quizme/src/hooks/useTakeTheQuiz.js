import axios from "axios"
import { useLocation } from "react-router-dom"
import { useEffect, useState, useRef} from "react"
    
export const useTakeTheQuiz = (currentUser) => {
    const quizID = useLocation().pathname.split("/")[1]

    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [showScore, setShowScore] = useState(false)
    const [prevScore, setPrevScore] = useState(null) 
    const score = useRef(0)

    // error i isLoading jako osobny hook?
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    

    const getUserScore = async () => {
        console.log("user score")
        const userID = currentUser ? currentUser.id : null
        if (!userID) {
            return console.log("not logged in")
        } else{ 
            try {
                const res = await axios.get(`/quiz/${quizID}/score?userID=${userID}`, {
                    withCredentials:true,
                })
                if (res.data.length === 0) {
                    setPrevScore(null)
                    return null
                } else
                {
                    setPrevScore(res.data[0].score)
                    return res.data[0].score
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    
    const setUserScore = async () => {
        const userID = currentUser ? currentUser.id : null
        if (!userID) {
            return console.log("not logged in")
        } else {
            const prevScore = await getUserScore()
            if (prevScore === null) {
                try {
                    await axios.post(`/quiz/user/${quizID}`, {
                        quizScore: score.current,
                        userID: userID,
                    })
                } catch (err) {
                    console.log(err)
                }
            } else if (prevScore < score.current) {
                try{
                    await axios.put(`/quiz/user/${quizID}`, {
                        quizScore: score.current,
                        userID: userID
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    // jak import?
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {const res = await axios.get(`/quiz/${quizID}`, {
                withCredentials:true,
            })
            setQuestions(res.data)
            await getUserScore()
            console.log("po pobraniu danych" + prevScore)
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
    
    return [isLoading, showScore, currentIndex, score, prevScore, currentAnswer, error, questions, handleTryAgain, handleNextQuestion, handleAnswerChange]
}