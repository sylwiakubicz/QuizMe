import config from "../config/index.js"
import nodemailer from "nodemailer"
import {verifyEmailTemplate} from "../emailTemplates/VerifyEmailTemplate.js"
import { ResetPasswordTemplate } from "../emailTemplates/ResetPasswordTemplate.js"
import {db} from "../db.js"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "quizme657@gmail.com",
        pass: config.nodemailer.pass
    }
})

export const sendMail = (req, res) => {
    const msg = {
        from: req.body.email,
        to: "quizme657@gmail.com",
        subject: req.body.title,
        text: "from: " + req.body.email + "\n\n" + req.body.message,
        html: `<div>
                    <h1>from: ${req.body.email}</h1>
                    <hr />
                    <p>\n\n ${req.body.message} </p>
                </div >`
    }

    const msgToUser = {
        from: "quizme657@gmail.com",
        to: req.body.email,
        subject: "Your email was received",
        text: "",
        html: {path: "./emailTemplates/MessageReceivedTemplate.html"}
    }

    transporter.sendMail(msg, (error, info) => {
        if (error) {
            console.log(error)
        }
        transporter.sendMail(msgToUser, (error, info) => {
            if (error) {
                console.log(error)
            }
        })
        return res.status(200).json("Message sent!")
    })
}

export const sendVerificationMail = (req, res) => {
    const verificationCode = req.body.verificationCode
    const template = verifyEmailTemplate(verificationCode)
    const msgToUser = {
        from: "quizme657@gmail.com",
        to: req.body.mail,
        subject: "Verify your account",
        text: "",
        html: template
    }
    
    transporter.sendMail(msgToUser, (error, info) => {
        if (error) {
            console.log(error)
        }
        return res.status(200).json("Message sent!")
    })
}

export const sendResetPasswordMail = (req, res) => {

    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (data.length === 0) {
            return res.status(404).json("User with this email does not exist")
        }
        else {
            const resetPassTemplate = ResetPasswordTemplate(req.body.verificationCode)
            const msgToUser = {
                from: "quizme657@gmail.com",
                to: req.body.email,
                subject: "Reset your password",
                text: "",
                html: resetPassTemplate
            }
            transporter.sendMail(msgToUser, (error, info)=> {
                if (error) {
                    return res.status(400)
                }
                return res.status(200).json("Message sent!")
            })
        }
})}
