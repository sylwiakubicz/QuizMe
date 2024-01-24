import express from "express"
import {getQuizes, getQuiz, updateQuiz, addQuiz, deleteQuiz, updateQuizStats, getUserScore} from "../controllers/quizControllers.js"

const router = express.Router()

router.get("/", getQuizes)

router.get('/:id', getQuiz)
router.get('/:id/score', getUserScore)
router.put('/:id/stats', updateQuizStats)

router.put("/:id", updateQuiz)
router.post("/", addQuiz)
router.delete("/:id", deleteQuiz)

export default router
