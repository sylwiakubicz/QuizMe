import {db} from "../db.js"
import {getCurrentTime} from "./authControllers.js"

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
    const q = "SELECT questions.id AS question_id, quizes.id AS quiz_id, quizes.title AS quizTitle, quizes.image AS quizImage, stats, question, answer1, answer2, answer3, answer4, answer5, correctAnswer, categories.category AS category FROM questions INNER JOIN quizes ON questions.quiz_id = quizes.id INNER JOIN categories ON quizes.category_id = categories.id WHERE quizes.id = ?"
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
                question_id: item.question_id,
                quizImage: item.quizImage,
                answers: [
                    { answer1: item.answer1 },
                    { answer2: item.answer2 },
                    { answer3: item.answer3 },
                    { answer4: item.answer4 },
                    { answer5: item.answer5 },
                ],
                correctAnswer: item.correctAnswer,
                quizStats: item.stats,
                category: item.category
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

function transformData(questionText, answers) {
    const result = {
      questionText: questionText,
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer5: "",
      correctAnswer: ""
    };
  
    answers.forEach((answer, index) => {
      if (index < 5) {
        result[`answer${index + 1}`] = answer.text;
        if (answer.isCorrect) {
          result.correctAnswer = answer.text;
        }
      }
    });
  
    for (let i = 1; i <= 5; i++) {
      if (!result[`answer${i}`]) {
        result[`answer${i}`] = null;
      }
    }
  
    return result;
}

export const addQuiz = (req,res) => {
    const quizData = req.body.quizData
    const date = getCurrentTime()

    const getcategoryid = "SELECT id FROM categories WHERE category=?"
    db.query(getcategoryid, quizData.category, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        const category_id = data[0].id 

        const inserQuizData = "INSERT INTO quizes (title, image, category_id, user_id, date) VALUES (?)"
        const values = [
            quizData.title,
            quizData.image,
            category_id,
            quizData.user_id,
            date
        ]

        db.query(inserQuizData, [values], (err, data) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send("Quiz added successfully")
        })
        return res.status(200)
    })
}

export const addQuestions = (req, res) => {
    const questionData = req.body.quizData.questions
    const quizData = req.body.quizData

    const getQuizId = "SELECT id FROM quizes WHERE title = ? AND user_id = ?"
    const inserQuestionData = "INSERT INTO questions (quiz_id, question, answer1, answer2, answer3, answer4, answer5, correctAnswer) VALUES (?)"
    db.query(getQuizId, [quizData.title, quizData.user_id] , (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        const quiz_id = data[0].id

        for (let i = 0; i < questionData.length; i++) {

            const transformedData = transformData(questionData[i].questionText, questionData[i].answers)
            const values = [
                quiz_id,
                transformedData.questionText,
                transformedData.answer1,
                transformedData.answer2,
                transformedData.answer3,
                transformedData.answer4,
                transformedData.answer5,
                transformedData.correctAnswer
            ]
            
            db.query(inserQuestionData, [values], (err, data) => {
                if (err) {
                    return res.status(500).send(err)
                }
            })
        }
        return res.status(200).send("Questions added successfully")
    })
}

export const deleteQuiz = (req,res) => {
    const q = "DELETE FROM quizes WHERE id=?"
    db.query(q, req.params.id, (err,data)=> {
        if(err) {
            return res.status(500).send(err)
        }
        return res.status(200).send("Quiz deleted")
    })
}

export const updateQuiz = (req,res) => {
    console.log("updateQuiz")
}

