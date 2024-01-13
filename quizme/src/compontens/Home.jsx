import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"
import "../style.css"
import { useLocation } from "react-router-dom"

function Home() {
    const category = useLocation().search
    console.log(category)

    const [quizes, setQuizes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/quiz${category}`, {
                    withCredentials:true,
                })
                setQuizes(res.data)
            } catch (err) {
                if (err) {
                    console.log(err)
                }
            }
        }

        fetchData()
    }, [category])

    return (
        <div>
            <h1>Tutaj będą quizy</h1>
            {quizes.map(quiz => (
                <div key={quiz.id}>
                    <p className="quizInfo">{quiz.title}</p>
                </div>
            ))}    
        </div>
    )
}

export default Home