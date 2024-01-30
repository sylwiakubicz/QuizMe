import {db} from "../db.js"
import bcrypt from "bcryptjs"


const getCurrentTime = () => {
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
    return strongRegex.test(password)
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

            if (!validatePassword(req.body.password)) {
                return res.status(409).json("Password should contain at least one lowercase and uppercase letter, one digit, oen special character and be at least 8 characters long.")
            }

            // HASH THE PASSWORD AND CREATE THE USER
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            
            const registerTime = getCurrentTime()
            // Add user
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


export const login = (req, res) => {
    console.log("login")
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