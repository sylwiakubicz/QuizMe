import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./App"
import ContactUsPage from "./AppContactUs"
import SignUpPage from "./AppSignUp"
import SignInPage from "./AppSignIn"

import "./style.css"


export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/AppContactUs" element={<ContactUsPage />} />
          <Route path="/AppSignIn" element={<SignInPage />} />
          <Route path="/AppSignUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    )
  }

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />);
