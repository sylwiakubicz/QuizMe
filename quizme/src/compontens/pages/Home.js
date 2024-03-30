import React from "react"
import {useEffect} from "react"
import { useLocation } from "react-router-dom"
import { QuizCard } from "../QuizCard"

import { QuizContext } from "../../context/quizContext"



function Home() {

    const {category, quizes, filterQuizes, isLoading,  setSearchingText, serachingText, setCategory} = React.useContext(QuizContext)
    
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
                    <select id="category" name="category" className="categoryDropList" onChange={e => {setCategory(e.target.value)}} value={category}>
                        <option className="option" value="" defaultChecked>All</option>
                        <option className="option" value="general">General knowledge</option>
                        <option className="option" value="celebrity">Celebrity</option>
                        <option className="option" value="personality">Personality</option>
                        <option className="option" value="science">Science</option>
                        <option className="option" value="geography">Geography</option>
                    </select>
            </div>
            

            { isLoading ?                 
                <div className="myaccount-container">
                    <p className="text ">Loading...</p> 
                </div>
                :
                serachingText ?
                filterQuizes.length > 0 ? 
                    <div className="quizes">
                        {filterQuizes.length > 0 && filterQuizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id} user_id={quiz.user_id}/>))}    
                    </div> 
                    : 
                    <div className="quizNotFound">
                        <div className=" text"> Could not find any quizzes</div>
                        <i className="fa-solid fa-face-sad-tear text"></i>
                    </div>

                :
                <div className="quizes">
                    {quizes.length > 0 && quizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id} user_id={quiz.user_id}/>))}    
                </div> 
            }
        </>
    )
}

export default Home