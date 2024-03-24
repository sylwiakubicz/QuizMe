import {db} from "../db.js"
import axios from "axios"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config/index.js"


const SITE_SECRET = config.reCaptcha.REACT_APP_SECRET_KEY

export const getCurrentTime = () => {
    var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
}

const validatePassword = (password) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    if (strongRegex.test(password)) return "correct"

    var lowercaseRegex = new RegExp("^(?=.*[a-z])")
    if (!lowercaseRegex.test(password)) return "Password must contain at least one lowercase letter"

    var uppercaseRegex = new RegExp("^(?=.*[A-Z])")
    if (!uppercaseRegex.test(password)) return "Password must contain at least one uppercase letter"

    var numberRegex = new RegExp("^(?=.*[0-9])")
    if (!numberRegex.test(password)) return "Password must contain at one least number"

    var specialCharRegex = new RegExp("^(?=.[!@#$%^&])")
    if (!specialCharRegex.test(password)) return "Password must contain at least one special character"

    var lengthRegex = new RegExp("^(?=.{8,})")
    if (!lengthRegex.test(password)) return "Password must be eight characters or longer"

}

export const checkIfHuman = async (req, res) => {
    const {captchaValue} = req.body
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`
    );
    res.send(data);
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

            // Validate password
            if (validatePassword(req.body.password) !== "correct") {
                return res.status(409).json(validatePassword(req.body.password))
            }

            // HASH THE PASSWORD AND CREATE THE USER
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            
            // Add user
            const registerTime = getCurrentTime()
            const values = [
                req.body.username,
                req.body.email,
                hash,
                registerTime,
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

export function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken

    if(token == null) return res.status(401).send("Token missing")

    jwt.verify(token, config.jwt.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Token is not valid")
        req.user = user
        next()
    })
}

export const login = (req, res) => {
    // Check user
    var emailRegex = new RegExp("^(?=.[@])")
    const q = emailRegex.test(req.body.email) ? "SELECT * FROM users WHERE email = ?" : "SELECT * FROM users WHERE username = ?"

    db.query(q, req.body.email, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (data.length === 0) {
            return res.status(404).send("User does not exist")
        }

        // Check password
        bcrypt.compare(req.body.password, data[0].password, function(err, result) {
            if (result == false) {
                return res.status(400).json("Wrong password!")
            }

            // session
            const user = {
                username: data[0].username,
                email: data[0].email,
                id: data[0].id
            }

            const accessToken = jwt.sign(user, config.jwt.ACCESS_TOKEN_SECRET)
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                semeSite: "none",
                secure: true
            }).status(200).send(user)
        }) 
    })
        
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
    }).status(200).json("User has been logout")
}


export const deleteAccount = (req, res) => {
    const user_id = req.query.user_id
    const q = "DELETE FROM users WHERE id=?"
    db.query(q, user_id, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json("User deleted")
    })
}


export const changePassword = (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q, req.query.user_id, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }

        bcrypt.compare(req.body.oldPassword, data[0].password, function(err, result) {
            if (!result) return res.status(400).json("Wrong password!")

            if (req.body.newPassword !== req.body.repeatedNewPassword) {
                return res.status(401).json("New passwords do not match")
            }

            if (validatePassword(req.body.newPassword) !== "correct") {
                return res.status(409).json(validatePassword(req.body.newPassword))
            }

            if(req.body.oldPassword === req.body.newPassword) {
                return res.status(401).json("the new password must be different from the old one")
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.newPassword, salt)
                                                                                                                                    
            const q = "UPDATE users SET password = ? WHERE id = ?"
            db.query(q, [hash, req.query.user_id], (err, data) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.status(200).send("Password updated")
            })
        })     
       return
    })
}

export const updateUserData = (req, res) => {
    const q = "UPDATE users SET username = ?, email = ? WHERE id = ?"
    db.query(q, [req.body.username, req.body.email, req.body.userID], (err,data) =>{
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).send("Data updated")
    })
}