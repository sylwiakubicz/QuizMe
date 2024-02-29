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
    
    const deleteAccount = async () => {
        console.log(currentUser.id)
        await axios.delete(`/auth/deleteAccount?user_id=${currentUser.id}`, {
            withCredentials: true
        })
        logout()
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