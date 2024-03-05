import express from "express"
import {sendMail} from "../controllers/sendMailControllers.js"

const router = express.Router()

router.post("/send", sendMail)

export default router