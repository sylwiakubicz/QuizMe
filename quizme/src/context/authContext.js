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

    const logout = async () => {
        await axios.post("/auth/logout", {
            withCredentials: true
        })
        setCurrentUser(null)
    }
    
    const deleteAccount = async (currentUser) => {
        await axios.delete("/auth/deleteAccount", currentUser, {
            withCredentials: true
        })
    }

    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout, deleteAccount}}>
            {children}
        </AuthContext.Provider>
    )
}