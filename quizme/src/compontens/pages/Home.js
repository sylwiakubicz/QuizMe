import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"
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
        <>
        <div className="searchContainer">
            <input></input>
            <label htmlFor="cars">Choose a category:</label>
            <select id="cars" name="cars">
                <option value="volvo">General knowledge</option>
                <option value="saab">Celebrity</option>
                <option value="fiat">Personality</option>
                <option value="audi">Science</option>
                <option value="audi">Geography</option>
            </select>
        </div>
        <div className="quizes">
            {quizes.length > 0 && quizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
        </div>
        </>
    )
}

export default Home