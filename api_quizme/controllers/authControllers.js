import {db} from "../db.js"
import bcrypt from "bcryptjs"

export const login = (req, res) => {
    console.log("login")
}

export const register = (req, res) => {
    // Check existing users
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (data.length) {
            return res.status(409).json("User already exists. Try to sign in.")
        }
        
        //Check if username is avaible
        const q = "SELECT * FROM users WHERE username = ?"
        db.query(q, [req.body.username], (err, data) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (data.length) {
                return res.status(409).json("Username has been already taken.")
            }

            // Check if passwords match
            if (req.body.password !== req.body.confrimPassword)  {
                return res.status(409).json("Passwords do not match")
            }
            if (req.body.password.length < 8) {
                return res.status(409).json("Passwors is too short.")
            }

            // HASH THE PASSWORD AND CREATE THE USER
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            
            // Add user
            const values = [
                req.body.username,
                req.body.email,
                hash,
                "2024-01-13 00:00:00"
            ]

            const q = "INSERT INTO users (username, email, password, register_date) VALUES (?)"

            db.query(q, [values], (err, data) => {
                if (err) {
                    return res.status(500).json(err)
                }
                return res.status(200).json("User created successfuly.")
            })
        })
    })
}

export const logout = (req, res) => {
    console.log("logout")
}

export const changePassword = (req, res) => {
    console.log("changePassword")
}

export const deleteUser = (req, res) => {
    console.log("deleteUser")
}