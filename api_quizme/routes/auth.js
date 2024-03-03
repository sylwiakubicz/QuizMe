import express from "express"
import {login, register, logout, changePassword, deleteAccount, checkIfHuman} from "../controllers/authControllers.js"

const router = express.Router()

router.post("/register", register)
router.post("/verify", checkIfHuman)
router.post("/login", login)
router.post("/logout", logout)
router.delete("/deleteAccount", deleteAccount)
router.put("/changePassword", changePassword)


export default router