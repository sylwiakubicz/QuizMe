import React from "react"

import {Routes, Route} from "react-router-dom";
import Home from "./Home"
import ContactUs from "./ContactUs"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Header from "./Header"
import Footer from "./Footer"

import "../style.css"


function App() {
    return (
      <div>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
          <Footer />
      </div >
    )
  }

export default App
