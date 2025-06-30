const pool = require("../database");

class ArticleRepository {
  static async create(title, content, imageUrl, slug, overviewTitle, overviewContent) {
    const result = await pool.query(
      `INSERT INTO Articles (title, content, image_url, slug, overview_title, overview_content) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [title, content, imageUrl, slug, overviewTitle, overviewContent]
    );
    return result.rows[0].id;
  }

  static async findAll() {
    const result = await pool.query(`SELECT * FROM Articles`);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`SELECT * FROM Articles WHERE id = $1`, [id]);
    return result.rows[0];
  }
}

module.exports = ArticleRepository;


