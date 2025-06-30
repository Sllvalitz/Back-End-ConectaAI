const pool = require("../database");

class UserRepository {
  static async create(username, email, passwordHash) {
    const result = await pool.query(
      `INSERT INTO Users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      [username, email, passwordHash]
    );
    return result.rows[0].id;
  }

  static async findByEmail(email) {
    const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    return result.rows[0];
  }

  static async findById(userId) {
    const result = await pool.query(`SELECT id, username, email FROM Users WHERE id = $1`, [userId]);
    return result.rows[0];
  }

  static async initializeProgress(userId) {
    await pool.query(
      `INSERT INTO User_Progress (user_id, xp, level) VALUES ($1, $2, $3)`,
      [userId, 0, 1]
    );
  }

  static async getUserProgress(userId) {
    const result = await pool.query(`SELECT * FROM User_Progress WHERE user_id = $1`, [userId]);
    return result.rows[0];
  }

  static async updateUserProgress(userId, xp, level) {
    await pool.query(
      `UPDATE User_Progress SET xp = $1, level = $2 WHERE user_id = $3`,
      [xp, level, userId]
    );
  }

  static async hasBadge(userId, badgeId) {
    const result = await pool.query(
      `SELECT * FROM User_Badges WHERE user_id = $1 AND badge_id = $2`,
      [userId, badgeId]
    );
    return result.rows.length > 0;
  }

  static async awardBadge(userId, badgeId) {
    await pool.query(
      `INSERT INTO User_Badges (user_id, badge_id) VALUES ($1, $2)`,
      [userId, badgeId]
    );
  }
}

module.exports = UserRepository;


