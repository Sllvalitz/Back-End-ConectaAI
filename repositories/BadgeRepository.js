const pool = require("../database");

class BadgeRepository {
  // Buscar todos os badges disponíveis
  static async findAll() {
    const result = await pool.query(`SELECT * FROM Badges ORDER BY id`);
    return result.rows;
  }

  // Buscar badge por ID
  static async findById(id) {
    const result = await pool.query(`SELECT * FROM Badges WHERE id = $1`, [id]);
    return result.rows[0];
  }

  // Buscar badges de um usuário específico
  static async findByUserId(userId) {
    const result = await pool.query(
      `SELECT b.* FROM Badges b 
       INNER JOIN User_Badges ub ON b.id = ub.badge_id 
       WHERE ub.user_id = $1 
       ORDER BY b.id`,
      [userId]
    );
    return result.rows;
  }

  // Verificar se usuário tem um badge específico
  static async userHasBadge(userId, badgeId) {
    const result = await pool.query(
      `SELECT * FROM User_Badges WHERE user_id = $1 AND badge_id = $2`,
      [userId, badgeId]
    );
    return result.rows.length > 0;
  }

  // Atribuir badge a um usuário
  static async awardBadgeToUser(userId, badgeId) {
    await pool.query(
      `INSERT INTO User_Badges (user_id, badge_id) VALUES ($1, $2)`,
      [userId, badgeId]
    );
  }

  // Criar um novo badge
  static async create(badgeName, description, imageUrl, thresholdXp) {
    const result = await pool.query(
      `INSERT INTO Badges (badge_name, description, image_url, threshold_xp) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [badgeName, description, imageUrl, thresholdXp]
    );
    return result.rows[0].id;
  }

  // Buscar badges por threshold de XP (para auto-concessão)
  static async findByThreshold(xp) {
    const result = await pool.query(
      `SELECT * FROM Badges WHERE threshold_xp <= $1 AND threshold_xp IS NOT NULL`,
      [xp]
    );
    return result.rows;
  }
}

module.exports = BadgeRepository; 