import express  from "express";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js" 
import quizRoutes from "./routes/quiz.js" 
import mailRoutes from "./routes/mail.js"



const app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/quiz", quizRoutes)
app.use("/api/mail", mailRoutes)



app.listen(12345, () => {
    console.log("Connected! ")
})