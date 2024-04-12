import express from "express"
import {sendMail, sendVerificationMail, sendResetPasswordMail} from "../controllers/sendMailControllers.js"

const router = express.Router()

router.post("/send", sendMail)
router.post("/send/veryficationMail", sendVerificationMail)
router.post("/send/resetpasswordMail/code", sendResetPasswordMail)
export default router