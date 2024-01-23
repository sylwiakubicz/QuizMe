import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"
import "../../style.css"
import { useLocation } from "react-router-dom"
import { QuizCard } from "../QuizCard"

function Home() {
    const [quizes, setQuizes] = useState([])
    const category = useLocation().search

    useEffect(() => {
        const contrller = new AbortController()
        const signal = contrller.signal
        const fetchData = async () => {
            try {
                const res = await axios.get(`/quiz${category}`, {signal}, {
                    withCredentials:true,
                })
                setQuizes(res.data)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.log(err)
                }
            }
        }

        fetchData()

        return () => {
            console.log("aborted")
            setQuizes([])
            contrller.abort();
        }

    }, [category])

    return (
        <div className="quizes">
            {quizes.length > 0 && quizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
        </div>
    )
}

export default Home