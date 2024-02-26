import React from "react"
import {useState, useEffect} from "react"
import { useLocation } from "react-router-dom"
import { QuizCard } from "../QuizCard"

import { QuizContext } from "../../context/quizContext"



function Home() {

    const {category, quizes, filterQuizes, setSearchingText, serachingText, setCategory} = React.useContext(QuizContext)
    
    const cat = useLocation().search
    useEffect(() => {
        setCategory(cat === "" ? "" : cat.split("=")[1])
    }, [cat]) 


    return (
        <>
            <div className="searchSection">
                <div className="serachContainer">
                    <input className="search" placeholder="Search..." onChange={e => {setSearchingText(e.target.value)}}></input>
                    <i className="fa-solid fa-magnifying-glass"></i>                    
                </div>
                    <select id="category" name="category" className="categoryDropList" onChange={e => {setCategory(e.target.value)}
                    } 
                        value={category}>
                        <option className="option" value="" defaultChecked>All</option>
                        <option className="option" value="general">General knowledge</option>
                        <option className="option" value="celebrity">Celebrity</option>
                        <option className="option" value="personality">Personality</option>
                        <option className="option" value="science">Science</option>
                        <option className="option" value="geography">Geography</option>
                    </select>
            </div>
            
            { serachingText ?
                filterQuizes.length > 0 ? 
                    <div className="quizes">
                        {filterQuizes.length > 0 && filterQuizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
                    </div> 
                    : 
                    <div className="quizes notFound">Sorry, we couldn't find any quizes that meet your search criteria</div>
                :
                <div className="quizes">
                    {quizes.length > 0 && quizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
                </div> 
            }
        </>
    )
}

export default Home