import React from "react"
import "./style.css"
import Header from "./compontens/Header"
import Footer from "./compontens/Footer"
import SignIn from "./compontens/SignIn"

function SignInPage() {
    return (
        <div>
            <Header />
            <SignIn />
            <Footer />
        </div>
    )
}

export default SignInPage