import config from "../config/index.js"
import nodemailer from "nodemailer"

export const sendMail = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "quizme657@gmail.com",
            pass: config.nodemailer.pass
        }
    })

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