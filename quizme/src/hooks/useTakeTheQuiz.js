import axios from "axios"
import { useLocation } from "react-router-dom"
import { useEffect, useState, useRef} from "react"
import { useHandleUserScore } from "./useHandleUserScore"
    
export const useTakeTheQuiz = (currentUser) => {
    const { username, email, id } = currentUser;

    const quizID = useLocation().pathname.split("/")[1]
    const {prevScore, setUserScore, getUserScore} = useHandleUserScore(currentUser)

    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [showScore, setShowScore] = useState(false)
    const score = useRef(0)

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {const res = await axios.get(`/quiz/${quizID}`, {
                withCredentials:true,
            })
            setQuestions(res.data)
            await getUserScore(quizID)
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

    const handleNextQuestion = (correctAnswer, quizStats, currentUser) => {
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
            setUserScore(score, quizID)
            setCurrentIndex(0)
            setShowScore(true)
        }

        setCurrentAnswer("")
    };

    const handleTryAgain = async () => {
        await getUserScore(quizID)
        setCurrentAnswer("")
        score.current = 0
        setShowScore(false)
    }
    
    return {isLoading, showScore, currentIndex, score, prevScore, currentAnswer, error, questions, handleTryAgain, handleNextQuestion, handleAnswerChange}
}