import express  from "express";
import authRoutes from "./routes/auth.js" 
import quizRoutes from "./routes/quiz.js" 


const app = express()

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/quiz", quizRoutes)



app.listen(12345, () => {
    console.log("Connected!")
})