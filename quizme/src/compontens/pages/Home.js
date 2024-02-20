import React from "react"
import {useState, useEffect} from "react"
import { useLocation } from "react-router-dom"
import { QuizCard } from "../QuizCard"

import { QuizContext } from "../../context/quizContext"



function Home() {

    const {category, quizes, filterQuizes, setSearchingText, changeCategory} = React.useContext(QuizContext)
    
    const cat = useLocation().search
    useEffect(() => {
        changeCategory(cat === "" ? "" : cat.split("=")[1])
    }, [cat]) 


    return (
        <>
            <div className="searchSection">
                <div className="serachContainer">
                    <input className="search" placeholder="Search..." onChange={e => {setSearchingText(e.target.value)}}></input>
                    <i className="fa-solid fa-magnifying-glass"></i>                    
                </div>
                    <select id="category" name="category" className="categoryDropList" onChange={e => {changeCategory(e.target.value)}
                    } 
                        value={category}>
                        <option value="" defaultChecked>Category</option>
                        <option value="general">General knowledge</option>
                        <option value="celebrity">Celebrity</option>
                        <option value="personality">Personality</option>
                        <option value="science">Science</option>
                        <option value="geography">Geography</option>
                    </select>
            </div>
            { filterQuizes.length > 0 ? 
                <div className="quizes">
                    {filterQuizes.length > 0 && filterQuizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
                </div> :
                <div className="quizes">
                    {quizes.length > 0 && quizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
                </div> 
            }
        </>
    )
}

export default Home