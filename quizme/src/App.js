import React from "react"

import {Routes, Route} from "react-router-dom";

import Home from "./compontens/pages/Home"
import ContactUs from "./compontens/pages/ContactUs"
import SignUp from "./compontens/pages/SignUp"
import SignIn from "./compontens/pages/SignIn"
import Header from "./compontens/layout/Header"
import Footer from "./compontens/layout/Footer"
import TakeTheQuiz from "./compontens/pages/TakeTheQuiz";

import "./style.css"

function App() {
    return (
      <div>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<TakeTheQuiz />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
          <Footer />
      </div >
    )
  }

export default App
