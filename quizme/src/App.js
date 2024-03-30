import React from "react"
import {Routes, Route, useLocation} from "react-router-dom";

import Home from "./compontens/pages/Home"
import ContactUs from "./compontens/pages/ContactUs"
import SignUp from "./compontens/pages/SignUp"
import SignIn from "./compontens/pages/SignIn"
import Header from "./compontens/layout/Header"
import Footer from "./compontens/layout/Footer"
import TakeTheQuiz from "./compontens/pages/TakeTheQuiz";
import MyQuizes from "./compontens/pages/MyQuizes";
import MyProfile from "./compontens/pages/MyProfile";
import Success from "./compontens/Success"
import CreateQuiz from "./compontens/pages/CreateQuiz";
import { ThemeContext } from './context/themeContext';
import {CreateQuizContext} from "./context/CreateQuizContext"


import "./style.css"

function App() {
  const {theme, switchTheme} = React.useContext(ThemeContext)
  const {deleteFromLocalStorage} = React.useContext(CreateQuizContext)


  console.log(useLocation().pathname)
  if (useLocation().pathname != "/createquiz") {
    console.log("delete")
    deleteFromLocalStorage()
  }

    return (
      <div data-theme={theme} className="app"> 
        <Header switchTheme={switchTheme} theme={theme}/>
          <Routes >
            <Route path="/" element={<Home/>} />
            <Route path="/success" element={<Success />}/>
            <Route path="/createquiz" element={< CreateQuiz />} />
            <Route path="/MyQuizes" element={<MyQuizes />}/>
            <Route path="/MyProfile" element={<MyProfile />}/>
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
