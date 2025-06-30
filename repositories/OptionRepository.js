

const pool = require("../database");

class OptionRepository {
  static async create(questionId, optionText, isCorrect) {
    const result = await pool.query(
      `INSERT INTO Options (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING id`,
      [questionId, optionText, isCorrect]
    );
    return result.rows[0].id;
  }

  static async findByQuestionId(questionId) {
    const result = await pool.query(`SELECT * FROM Options WHERE question_id = $1`, [questionId]);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`SELECT * FROM Options WHERE id = $1`, [id]);
    return result.rows[0];
  }

  static async findCorrectOption(questionId) {
    const result = await pool.query(`SELECT * FROM Options WHERE question_id = $1 AND is_correct = TRUE`, [questionId]);
    return result.rows[0];
  }
}

module.exports = OptionRepository;


