import {db} from "../db.js"

export const getQuizes = (req,res) => {
    const q = req.query.category 
        ? "SELECT quizes.id AS quiz_id, title,  image, category_id, user_id, stats, cat.id AS cat_id, category  FROM quizes AS quizes INNER JOIN categories AS cat ON quizes.category_id = cat.id WHERE cat.category = ?"
        : "SELECT id AS quiz_id, title, image, category_id, user_id, stats FROM quizes"
        db.query(q, [req.query.category], (err, data) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).json(data)
        })
}

export const getQuiz = (req,res) => {
    const quizID  = req.params.id
    const q = "SELECT questions.id AS question_id, quizes.id AS quiz_id, quizes.title AS quizTitle, quizes.image AS quizImage, stats, question, answer1, answer2, answer3, answer4, answer5, correctAnswer FROM questions INNER JOIN quizes ON questions.quiz_id = quizes.id WHERE quizes.id = ?"
    db.query(q, [quizID], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
    
        const formatedData = data.map(item => {
            return {
                question_id: item.question_id,
                quiz_id: item.quiz_id,
                quizTitle: item.quizTitle,
                question: item.question,
                quizImage: item.quizImage,
                answers: [
                    { answer1: item.answer1 },
                    { answer2: item.answer2 },
                    { answer3: item.answer3 },
                    { answer4: item.answer4 },
                    { answer5: item.answer5 },
                ],
                correctAnswer: item.correctAnswer,
                quizStats: item.stats
            };
        });
        return res.status(200).json(formatedData)
    })
}

export const updateQuizStats = (req, res) => {
    const quizID = req.params.id
    const q = "UPDATE quizes SET stats = ? WHERE id = ?"
    db.query(q, [req.body.quizStats, quizID], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).send("Stats updated")
    })
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

