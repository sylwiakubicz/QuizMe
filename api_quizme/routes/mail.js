import express from "express"
import {sendMail, sendVerificationMail} from "../controllers/sendMailControllers.js"

const router = express.Router()

router.post("/send", sendMail)
router.post("/send/veryficationMail", sendVerificationMail)

export default router