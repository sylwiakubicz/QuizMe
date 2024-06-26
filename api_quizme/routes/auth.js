import express from "express"
import {login, register, logout, changePassword, deleteAccount, checkIfHuman, updateUserData, verifyEmail, sendNewVerificationEmail} from "../controllers/authControllers.js"

const router = express.Router()

router.post("/register", register)
router.post("/verify", checkIfHuman)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify/email", verifyEmail)
router.post("/send/verificationMail/new", sendNewVerificationEmail) 
router.delete("/deleteAccount", deleteAccount)
router.put("/changePassword", changePassword)
router.put("/updateuserdata", updateUserData)


export default router