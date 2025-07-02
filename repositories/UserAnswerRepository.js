

const pool = require("../database");

class UserAnswerRepository {
  static async create(userId, questionId, selectedOptionId, answerText, isCorrect) {
    const result = await pool.query(
      `INSERT INTO User_Answers (user_id, question_id, selected_option_id, answer_text, is_correct) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [userId, questionId, selectedOptionId, answerText, isCorrect]
    );
    return result.rows[0].id;
  }

  static async findByUserIdAndQuestionId(userId, questionId) {
    const result = await pool.query(
      `SELECT * FROM User_Answers WHERE user_id = $1 AND question_id = $2`,
      [userId, questionId]
    );
    return result.rows[0];
  }
}

module.exports = UserAnswerRepository;


