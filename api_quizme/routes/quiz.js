import express from "express"
import {getQuizes, getUserQuizes, getQuiz, updateQuiz, addQuiz, deleteQuiz, updateQuizStats, getUserScore, setUserScore, updateUserScore, addQuestions, deleteQuestions} from "../controllers/quizControllers.js"

const router = express.Router()

router.put("/update", updateQuiz)
router.post("/", addQuiz)
router.post("/questions", addQuestions)
router.delete("/:id", deleteQuiz)
router.delete("/questions/:id", deleteQuestions)

router.get("/", getQuizes)
router.get('/userquizes', getUserQuizes)

router.get('/:id',getQuiz)
router.get('/:id/score', getUserScore)
router.post('/user/:id', setUserScore)
router.put('/user/:id', updateUserScore)
router.put('/:id/stats', updateQuizStats)

export default router
