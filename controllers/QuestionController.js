

const QuestionService = require("../services/QuestionService");

class QuestionController {
  static async createQuestion(req, res) {
    const { quizId, questionText, questionType } = req.body;
    if (!quizId || !questionText || !questionType) {
      return res.status(400).json({ message: "Quiz ID, question text, and question type are required." });
    }
    try {
      const questionId = await QuestionService.createQuestion(quizId, questionText, questionType);
      res.status(201).json({ message: "Question created successfully!", questionId });
    } catch (error) {
      console.error("Error creating question:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getQuestionsByQuizId(req, res) {
    const { quizId } = req.params;
    try {
      const questions = await QuestionService.getQuestionsByQuizId(quizId);
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error getting questions by quiz ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getQuestionById(req, res) {
    const { id } = req.params;
    try {
      const question = await QuestionService.getQuestionById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found." });
      }
      res.status(200).json(question);
    } catch (error) {
      console.error("Error getting question by ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = QuestionController;


