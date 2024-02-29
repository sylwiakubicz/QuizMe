import React from "react"
import { AuthContext } from "../../context/authContext"
import { QuizCard } from "../QuizCard"
import axios from "axios";
import {Link} from "react-router-dom"



function MyQuizes() {

    const {currentUser} = React.useContext(AuthContext)

    const [myQuizes, setMyQuizes] = React.useState([])
    const [currentFilter, setCurrentFiler] = React.useState("")

    React.useEffect(() => {

        const controller = new AbortController()
        const signal = controller.signal

        const params = {
            user_id: currentUser.user_id,
            filter: currentFilter
        }

        const fetchQuizes = async () => {
            try {
                const res = await axios.get(`/quiz/userquizes?user_id=${currentUser.id}&filter=${currentFilter}`, {signal}, {
                    withCredentials:true,
                })
                setMyQuizes(res.data)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.log(err)
                }
            }
        }

        fetchQuizes()

        return () => {
            controller.abort();
        }
        
    
    }, [currentFilter])
    

    return (
        <div>
            {
                myQuizes.length !== 0 ? 
                <div>
                    <div className="searchSection">
                        <h1 className="text">Quizes by {currentUser.username}: </h1>
                        <select id="sort" name="sort" className="categoryDropList" onChange={(e) => setCurrentFiler(e.target.value)} value={currentFilter}>
                            <option className="option" value="" defaultChecked>Show</option>
                            <option className="option" value="recent">Most recent</option>
                            <option className="option" value="popular">Most popular</option>
                        </select>
                    </div>
                    <div className="quizes">
                        {myQuizes.length > 0 && myQuizes.map(quiz => ( <QuizCard title={quiz.title} stats={quiz.stats} id={quiz.quiz_id} key={quiz.quiz_id}/>))}    
                    </div> 
                </div>
                : <div className="question--container quiz--infoCard myQuizes--container">
                    <p className="quiz--title">Create your first quiz</p>
                    <i className="fa-solid fa-question fa-rotate-180 quiz--title"></i>
                    <Link to="#"><button className="quiz--btn">Create a quiz</button></Link>
                </div>
            }
           
        </div>
    )
}

export default MyQuizes