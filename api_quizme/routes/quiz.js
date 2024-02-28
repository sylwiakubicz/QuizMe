import express from "express"
import {getQuizes, getUserQuizes, getQuiz, updateQuiz, addQuiz, deleteQuiz, updateQuizStats, getUserScore, setUserScore, updateUserScore} from "../controllers/quizControllers.js"
import {authenticateToken} from "../controllers/authControllers.js"

const router = express.Router()

router.get("/", getQuizes)
router.get('/userquizes', getUserQuizes)

router.get('/:id',getQuiz)
router.get('/:id/score', getUserScore)
router.post('/:id', setUserScore)
router.put('/:id', updateUserScore)
router.put('/:id/stats', updateQuizStats)

router.put("/:id", updateQuiz)
router.post("/", addQuiz)
router.delete("/:id", deleteQuiz)

export default router
