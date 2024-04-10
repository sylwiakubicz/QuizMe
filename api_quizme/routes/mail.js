import express from "express"
import {sendMail, sendVerificationMail} from "../controllers/sendMailControllers.js"
import { sendNewVerificationEmail } from "../controllers/authControllers.js"

const router = express.Router()

router.post("/send", sendMail)
router.post("/send/veryficationMail", sendVerificationMail)
router.post("/send/verificationMail/new", sendNewVerificationEmail)

export default router