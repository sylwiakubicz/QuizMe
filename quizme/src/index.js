import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {BrowserRouter} from "react-router-dom";
import { AuthContextProvider } from "./context/authContext"
import { QuizContextProvider } from "./context/quizContext"
import {CreateQuizContextProvider} from "./context/CreateQuizContext"


import "./style.css"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <CreateQuizContextProvider>
    <AuthContextProvider>
      <QuizContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuizContextProvider>
    </AuthContextProvider>
    </CreateQuizContextProvider>
  </React.StrictMode>
)
