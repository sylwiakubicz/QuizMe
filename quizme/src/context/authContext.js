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
    
    const changePassword = async (inputs) => {
        await axios.put(`/auth/changePassword?user_id=${currentUser.id}`, inputs, {
            withCredentials: true
        })
        logout()
    }

    const deleteAccount = async () => {
        await axios.delete(`/auth/deleteAccount?user_id=${currentUser.id}`, {
            withCredentials: true
        })
        logout()
    }

    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout, deleteAccount, changePassword}}>
            {children}
        </AuthContext.Provider>
    )
}