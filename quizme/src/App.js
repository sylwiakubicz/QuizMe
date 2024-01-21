import React from "react"

import {Routes, Route} from "react-router-dom";

import Home from "./compontens/Home"
import ContactUs from "./compontens/ContactUs"
import SignUp from "./compontens/SignUp"
import SignIn from "./compontens/SignIn"
import Header from "./compontens/Header"
import Footer from "./compontens/Footer"
import QuizQuestionCard from "./compontens/QuizQuestionCard"

import "./style.css"

function App() {
    return (
      <div>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<QuizQuestionCard />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
          <Footer />
      </div >
    )
  }

export default App
