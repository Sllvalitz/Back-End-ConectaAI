

const UserAnswerRepository = require("../repositories/UserAnswerRepository");

class UserAnswerService {
  static async createUserAnswer(userId, questionId, selectedOptionId, answerText, isCorrect) {
    return await UserAnswerRepository.create(userId, questionId, selectedOptionId, answerText, isCorrect);
  }

  static async getUserAnswer(userId, questionId) {
    return await UserAnswerRepository.findByUserIdAndQuestionId(userId, questionId);
  }
}

module.exports = UserAnswerService;


