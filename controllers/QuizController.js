

const QuizService = require("../services/QuizService");

class QuizController {
  static async createQuiz(req, res) {
    const { articleId, title, description, xpReward, badgeId } = req.body;
    if (!articleId || !title) {
      return res.status(400).json({ message: "Article ID and title are required." });
    }
    try {
      const quizId = await QuizService.createQuiz(articleId, title, description, xpReward, badgeId);
      res.status(201).json({ message: "Quiz created successfully!", quizId });
    } catch (error) {
      console.error("Error creating quiz:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getQuizzesByArticleId(req, res) {
    const { articleId } = req.params;
    try {
      const quizzes = await QuizService.getQuizzesByArticleId(articleId);
      res.status(200).json(quizzes);
    } catch (error) {
      console.error("Error getting quizzes by article ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getQuizById(req, res) {
    const { id } = req.params;
    try {
      const quiz = await QuizService.getQuizById(id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found." });
      }
      res.status(200).json(quiz);
    } catch (error) {
      console.error("Error getting quiz by ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async submitQuiz(req, res) {
    const { userId, quizId, answers } = req.body;
    if (!userId || !quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "User ID, Quiz ID, and answers array are required." });
    }
    try {
      const result = await QuizService.submitQuiz(userId, quizId, answers);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error submitting quiz:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = QuizController;


