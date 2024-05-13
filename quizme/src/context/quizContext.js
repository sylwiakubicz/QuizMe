import axios from "axios";
import React from "react";

export const QuizContext = React.createContext()

export const QuizContextProvider = ({children}) => {


    const [category, setCategory] = React.useState("")
    const [allQuizes, setAllQuizes] = React.useState([])
    const [quizes, setQuizes] = React.useState([])
    const [filterQuizes, setFilterQuizes] = React.useState([])
    const [serachingText, setSearchingText] = React.useState("")

    const [isLoading, setIsLoading] = React.useState(false)


    React.useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchQuizes = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`/quiz${category === "" ? "" : "?category=" + category}`, {signal}, {
                    withCredentials:true,
                })
                setQuizes(res.data)
                setAllQuizes(res.data)
                setIsLoading(false)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.log(err)
                }
            }
        }

        fetchQuizes()

        return () => {
            setQuizes([])
            controller.abort();
        }

    }, [category])

    React.useEffect(() => {
        let temp = []
        if (serachingText) {
            setIsLoading(true)
            for (let i = 0; i < quizes.length; i++) {
                let currentQuizName = quizes[i].title.toString()
                    if (currentQuizName.toLowerCase().startsWith(serachingText.toLowerCase())) {
                    temp.push(quizes[i])
                }
            }

            setFilterQuizes(temp)
            setIsLoading(false)

        } else {
            setFilterQuizes([])
        }

    }, [serachingText, quizes])


    const deleteQuiz = async (id) => {
        try {
            await axios.delete(`/quiz/${id}`, {
                withCredentials:true,
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <QuizContext.Provider value={{category, quizes, filterQuizes, serachingText, allQuizes, isLoading, deleteQuiz, setSearchingText, setCategory}}>
            {children}
        </QuizContext.Provider>
    )
}
