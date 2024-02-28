import React from "react"
import useLocalStorage from "use-local-storage"
import {Routes, Route} from "react-router-dom";

import Home from "./compontens/pages/Home"
import ContactUs from "./compontens/pages/ContactUs"
import SignUp from "./compontens/pages/SignUp"
import SignIn from "./compontens/pages/SignIn"
import Header from "./compontens/layout/Header"
import Footer from "./compontens/layout/Footer"
import TakeTheQuiz from "./compontens/pages/TakeTheQuiz";
import MyQuizes from "./compontens/pages/MyQuizes";

import "./style.css"

function App() {

    const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

    const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
    }

    return (
      <div data-theme={theme} className="app"> 
        <Header switchTheme={switchTheme} theme={theme}/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/MyQuizes" element={<MyQuizes />}/>
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
