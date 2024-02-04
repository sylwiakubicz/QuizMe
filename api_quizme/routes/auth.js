import express from "express"
import {login, register, logout, changePassword, deleteUser, checkIfHuman} from "../controllers/authControllers.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/verify", checkIfHuman)
router.post("/logout", logout)
router.put("/:uid", changePassword)
router.delete("/:uid", deleteUser)


export default router