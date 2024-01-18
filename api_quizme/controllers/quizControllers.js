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
    const quizID  = req.params.id
    const q = "SELECT questions.id AS id, quizes.id AS qid, quizes.title AS quizTitle, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `answer5`, `correctAnswer` FROM `quizme`.`questions` AS questions INNER JOIN `quizme`.`quizes` AS quizes ON questions.quiz_id = quizes.id WHERE quizes.id = ?"
    db.query(q, [quizID], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
    
        const formatedData = data.map(item => {
            return {
                id: item.id,
                qid: item.qid,
                quizTitle: item.quizTitle,
                question: item.question,
                answers: [
                    { answer1: item.answer1 },
                    { answer2: item.answer2 },
                    { answer3: item.answer3 },
                    { answer4: item.answer4 },
                    { answer5: item.answer5 },
                ],
                correctAnswer: item.correctAnswer
            };
        });
        return res.status(200).json(formatedData)
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

