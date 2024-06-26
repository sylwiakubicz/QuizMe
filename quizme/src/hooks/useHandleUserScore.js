import axios from "axios"
import { useState } from "react"

export const useHandleUserScore = (currentUser) => {

    const [prevScore, setPrevScore] = useState(null) 

    const getUserScore = async (quizID) => {
        const userID = currentUser ? currentUser.id : null
        if (!userID) {
            return 
        } else { 
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

    const setUserScore = async (score, quizID) => {
        const userID = currentUser ? currentUser.id : null
        if (!userID) {
            return 
        } else {
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
    
    return {getUserScore, setUserScore, prevScore}
}