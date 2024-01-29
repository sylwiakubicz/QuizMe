import mysql from "mysql2"
import config from "./config/index.js"

export const db = mysql.createConnection(config.mysql)


db.connect(error => {
    if (error) {
        console.log("error with connection")
        console.log(error)
    }
    console.log("connected to db")
})