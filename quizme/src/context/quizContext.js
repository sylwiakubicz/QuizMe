import axios from "axios";
import React from "react";

export const QuizContext = React.createContext()

export const QuizContextProvider = ({children}) => {


    const [category, setCategory] = React.useState("")
    const [quizes, setQuizes] = React.useState([])

    const changeCategory = (cat) => {
        setCategory(cat)
    }

    React.useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchData = async () => {
            try {
                const res = await axios.get(`/quiz${category === "" ? "" : "?category=" + category}`, {signal}, {
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
            controller.abort();
        }

    }, [category])



    return (
        <QuizContext.Provider value={{category, quizes, changeCategory}}>
            {children}
        </QuizContext.Provider>
    )
}
