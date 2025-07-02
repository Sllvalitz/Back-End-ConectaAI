

const pool = require("../database");

class QuestionRepository {
  static async create(quizId, questionText, questionType) {
    const result = await pool.query(
      `INSERT INTO Questions (quiz_id, question_text, question_type) VALUES ($1, $2, $3) RETURNING id`,
      [quizId, questionText, questionType]
    );
    return result.rows[0].id;
  }

  static async findByQuizId(quizId) {
    const result = await pool.query(`SELECT * FROM Questions WHERE quiz_id = $1`, [quizId]);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`SELECT * FROM Questions WHERE id = $1`, [id]);
    return result.rows[0];
  }
}

module.exports = QuestionRepository;


