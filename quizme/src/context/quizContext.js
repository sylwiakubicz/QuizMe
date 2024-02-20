import axios from "axios";
import React from "react";

export const QuizContext = React.createContext()

export const QuizContextProvider = ({children}) => {


    const [category, setCategory] = React.useState("")
    const [quizes, setQuizes] = React.useState([])
    const [filterQuizes, setFilterQuizes] = React.useState([])
    const [serachingText, setSearchingText] = React.useState("")

    const changeCategory = (cat) => {
        setCategory(cat)
    }


    React.useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchQuizes = async () => {
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
                    console.log("Wyszukiwana fraza to " + serachingText)
                    console.log(currentQuizName);
                    // dodawanie do temporaru array
                    temp.push(quizes[i])
                }
            }
            // dodanie tablicy do state
            setFilterQuizes(temp)
        } else {
            // usunięcie tablicy z state
            setFilterQuizes([])
        }

    }, [serachingText])

    return (
        <QuizContext.Provider value={{category, quizes, filterQuizes, serachingText, setSearchingText, changeCategory}}>
            {children}
        </QuizContext.Provider>
    )
}
