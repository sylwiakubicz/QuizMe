import {db} from "../db.js"

export const getQuizes = (req,res) => {
    const q = req.query.category 
        ? "SELECT * FROM `quizme`.`quizes` AS quizes INNER JOIN `quizme`.`categories` AS cat ON quizes.category_id = cat.id WHERE cat.category = ?"
        : "SELECT * FROM `quizme`.`quizes`"
    
        db.query(q, [req.query.category], (err, data) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).json(data)
        })
}

export const getQuiz = (req,res) => {
    console.log("getQuiz")
}

export const addQuiz = (req,res) => {
    console.log("addQuiz")
}

export const deleteQuiz = (req,res) => {
    console.log("deleteQuiz")
}

export const updateQuiz = (req,res) => {
    console.log("updateQuiz")
}

