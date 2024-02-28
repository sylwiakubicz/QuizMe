import axios from "axios";
import React from "react";

export const QuizContext = React.createContext()

export const QuizContextProvider = ({children}) => {


    const [category, setCategory] = React.useState("")
    const [allQuizes, setAllQuizes] = React.useState([])
    const [quizes, setQuizes] = React.useState([])
    const [filterQuizes, setFilterQuizes] = React.useState([])
    const [serachingText, setSearchingText] = React.useState("")

    React.useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchQuizes = async () => {
            try {
                const res = await axios.get(`/quiz${category === "" ? "" : "?category=" + category}`, {signal}, {
                    withCredentials:true,
                })
                setQuizes(res.data)
                setAllQuizes(res.data)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.log(err)
                }
            }
        }

        fetchQuizes()

        return () => {
            console.log("aborted")
            setQuizes([])
            controller.abort();
        }

    }, [category])

    React.useEffect(() => {
        let temp = []
        if (serachingText) {
            for (let i = 0; i < quizes.length; i++) {
                let currentQuizName = quizes[i].title.toString()
                    if (currentQuizName.toLowerCase().startsWith(serachingText.toLowerCase())) {
                    temp.push(quizes[i])
                }
            }

            setFilterQuizes(temp)

        } else {
            setFilterQuizes([])
        }

    }, [serachingText, quizes])

    return (
        <QuizContext.Provider value={{category, quizes, filterQuizes, serachingText, allQuizes, setSearchingText, setCategory}}>
            {children}
        </QuizContext.Provider>
    )
}
