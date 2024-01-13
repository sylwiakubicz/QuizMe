import express from "express"
import {getQuizes, getQuiz, updateQuiz, addQuiz, deleteQuiz} from "../controllers/quizControllers.js"

const router = express.Router()

router.get("/", getQuizes)
router.get('/:qid', getQuiz)
router.put("/:qid", updateQuiz)
router.post("/", addQuiz)
router.delete("/:qid", deleteQuiz)

export default router
