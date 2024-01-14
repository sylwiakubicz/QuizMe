import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"
import "../style.css"
import { useLocation } from "react-router-dom"
import { Quiz } from "./Quiz"

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
        <div className="quizes">
            {quizes.map(quiz => ( <Quiz title={quiz.title} stats={quiz.stats} id={quiz.id} key={quiz.id}/>))}    
        </div>
    )
}

export default Home