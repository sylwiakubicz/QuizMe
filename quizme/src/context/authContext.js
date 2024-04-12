import axios from "axios";
import React, { useEffect } from "react";

export const AuthContext = React.createContext()

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = React.useState(
        JSON.parse(localStorage.getItem("user")) || null
        )
    
    const [error, setError] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [resetPass, setResetPass] = React.useState(false)

    

    const verifyEmailCode = React.useRef("")
    const generateCode = () => {
        let code = (Math.random() + 1).toString(36).substring(7);
        verifyEmailCode.current = code
    }

    useEffect(() => {
        setTimeout(()=> {
            console.log("code expired")
            verifyEmailCode.current =""
        }, 600000)
    }, [generateCode])

    const sendResetEmailCode = async () => {
        setResetPass(true)
        if (email === "") {
            setError("Field can not be empty")
            return
        }

        generateCode()

        const resetPassData = {
            verificationCode: verifyEmailCode.current,
            email: email
        }

        try {
            await axios.post("/mail/send/resetpasswordMail/code", resetPassData, {
                withCredentials: true
            })
            console.log("sent")
            return true
        } catch (error) {
            setError(error.response.data)
            return false
        }
    }

    const compareCodes = (code) => {
        if (code === verifyEmailCode.current) {
            return true
        }
        else {
            setError("Wrong or expired verification code")
            return false
        }
    }

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
        try {
            await axios.put(`/auth/changePassword?user_id=${currentUser?.id}`, inputs, {
            withCredentials: true
        })
        logout() 
        return null
    } 
        catch (err) {
            console.log(err)
            setError(err.response.data)
            return "error"
        }
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
        <AuthContext.Provider value={{currentUser, error, login, logout, deleteAccount, changePassword, email, setEmail,sendResetEmailCode, compareCodes, resetPass}}>
            {children}
        </AuthContext.Provider>
    )
}