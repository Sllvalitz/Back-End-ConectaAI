

const UserAnswerService = require("../services/UserAnswerService");

class UserAnswerController {
  static async createUserAnswer(req, res) {
    const { userId, questionId, selectedOptionId, answerText, isCorrect } = req.body;
    if (!userId || !questionId) {
      return res.status(400).json({ message: "User ID and Question ID are required." });
    }
    try {
      const userAnswerId = await UserAnswerService.createUserAnswer(userId, questionId, selectedOptionId, answerText, isCorrect);
      res.status(201).json({ message: "User answer recorded successfully!", userAnswerId });
    } catch (error) {
      console.error("Error recording user answer:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getUserAnswer(req, res) {
    const { userId, questionId } = req.params;
    try {
      const userAnswer = await UserAnswerService.getUserAnswer(userId, questionId);
      if (!userAnswer) {
        return res.status(404).json({ message: "User answer not found." });
      }
      res.status(200).json(userAnswer);
    } catch (error) {
      console.error("Error getting user answer:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = UserAnswerController;


