import axios from "axios";
import React from "react";

export const AuthContext = React.createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(
        JSON.parse(localStorage.getItem("user")) || null
        )

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs, {
            withCredentials: true
        })
        setCurrentUser(res.data)
    }

    const logout = async (inputs) => {
        await axios.post("/auth/logout", {
            withCredentials: true
        })
        setCurrentUser(null)
    }

    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}