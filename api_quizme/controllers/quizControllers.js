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

export const getUserQuizes = (req,res) => {
    const filter = req.query.filter
    const user_id = req.query.user_id
    let q = ""

    switch (filter) {
        case '':
            q = "SELECT id AS quiz_id, title, image, category_id, user_id, stats, date FROM quizes WHERE user_id = ?"
            break
        case 'recent':
            q = "SELECT id AS quiz_id, title, image, category_id, user_id, stats, date FROM quizes WHERE user_id = ? ORDER BY date DESC"
            break
        case 'popular':
            q = "SELECT id AS quiz_id, title, image, category_id, user_id, stats, date FROM quizes WHERE user_id = ? ORDER BY stats DESC" 
            break
        default:
            return res.status(404).json("Filter is not allowed")
    }

    db.query(q, [user_id], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(data)
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

export const getUserScore = (req, res) => {
    const quizID = req.params.id
    const userID = req.query.userID
    const q = "SELECT score FROM usersscore WHERE userID = ? AND quizID = ?"
    db.query(q, [userID, quizID], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(data)
    })
}

export const setUserScore = (req, res) => {
    const values = [
        req.body.userID,
        req.params.id,
        req.body.quizScore
    ]
    const q = "INSERT INTO usersscore (userID, quizID, score) VALUES (?)"
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).send("Score added")
    })
}

export const updateUserScore = (req, res) => {
    const quizID = req.params.id
    const userID = req.body.userID
    const q = "UPDATE usersscore SET score = ? WHERE quizID = ? AND userID = ?"
    db.query(q, [req.body.quizScore, quizID, userID], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).send("Score updated")
    })
}

// {
//     title: 'Test',
//     image: '',
//     category: 'None',
//     user_id: 23,
//     questions: [
//       { id: 1, questionText: 'te', answers: [Array] },
//       { id: 2, questionText: 'test', answers: [Array] },
//       { id: 3, questionText: 'tset', answers: [Array] },
//       { id: 4, questionText: 'rewr', answers: [Array] }
//     ]
//   }


export const addQuiz = (req,res) => {
    console.log("addQuiz")
    console.log(req.body.quizData)
}

export const deleteQuiz = (req,res) => {
    console.log("deleteQuiz")
}

export const updateQuiz = (req,res) => {
    console.log("updateQuiz")
}

