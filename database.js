
const { Pool } = require("pg");

// Replace with your Supabase PostgreSQL connection string
// Example: postgresql://postgres:[YOUR_PASSWORD]@project-id.supabase.co:5432/postgres
const connectionString = process.env.DATABASE_URL || "postgresql://postgres.jzmwdoljbzzazpzbqgcy:8723@aws-0-sa-east-1.pooler.supabase.com:6543/postgres";

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err.message);
    return;
  } else {
    console.log("Connected to the PostgreSQL database.");
    client.query(
      `CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating Users table:", err.message);
        } else {
          console.log("Users table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS User_Progress (
        user_id INTEGER PRIMARY KEY REFERENCES Users(id),
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1
      )`,
      (err) => {
        if (err) {
          console.error("Error creating User_Progress table:", err.message);
        } else {
          console.log("User_Progress table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS Badges (
        id SERIAL PRIMARY KEY,
        badge_name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        threshold_xp INTEGER
      )`,
      (err) => {
        if (err) {
          console.error("Error creating Badges table:", err.message);
        } else {
          console.log("Badges table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS User_Badges (
        user_id INTEGER REFERENCES Users(id),
        badge_id INTEGER REFERENCES Badges(id),
        PRIMARY KEY (user_id, badge_id)
      )`,
      (err) => {
        if (err) {
          console.error("Error creating User_Badges table:", err.message);
        } else {
          console.log("User_Badges table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS Articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image_url VARCHAR(255),
        slug VARCHAR(255),
        overview_title VARCHAR(255),
        overview_content TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error creating Articles table:", err.message);
        } else {
          console.log("Articles table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS Quizzes (
        id SERIAL PRIMARY KEY,
        article_id INTEGER REFERENCES Articles(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        xp_reward INTEGER DEFAULT 0,
        badge_id INTEGER REFERENCES Badges(id)
      )`,
      (err) => {
        if (err) {
          console.error("Error creating Quizzes table:", err.message);
        } else {
          console.log("Quizzes table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS Questions (
        id SERIAL PRIMARY KEY,
        quiz_id INTEGER REFERENCES Quizzes(id),
        question_text TEXT NOT NULL,
        question_type VARCHAR(50) NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating Questions table:", err.message);
        } else {
          console.log("Questions table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS Options (
        id SERIAL PRIMARY KEY,
        question_id INTEGER REFERENCES Questions(id),
        option_text TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating Options table:", err.message);
        } else {
          console.log("Options table created or already exists.");
        }
      }
    );
    client.query(
      `CREATE TABLE IF NOT EXISTS User_Answers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        question_id INTEGER REFERENCES Questions(id),
        selected_option_id INTEGER REFERENCES Options(id),
        answer_text TEXT,
        is_correct BOOLEAN
      )`,
      (err) => {
        if (err) {
          console.error("Error creating User_Answers table:", err.message);
        } else {
          console.log("User_Answers table created or already exists.");
        }
      }
    );
  }
  done();
});

module.exports = pool;


