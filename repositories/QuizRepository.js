

const pool = require("../database");

class QuizRepository {
  static async create(articleId, title, description, xpReward, badgeId) {
    const result = await pool.query(
      `INSERT INTO Quizzes (article_id, title, description, xp_reward, badge_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [articleId, title, description, xpReward, badgeId]
    );
    return result.rows[0].id;
  }

  static async findByArticleId(articleId) {
    const result = await pool.query(`SELECT * FROM Quizzes WHERE article_id = $1`, [articleId]);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`SELECT * FROM Quizzes WHERE id = $1`, [id]);
    return result.rows[0];
  }
}

module.exports = QuizRepository;


