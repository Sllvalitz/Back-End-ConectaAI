

const QuestionRepository = require("../repositories/QuestionRepository");

class QuestionService {
  static async createQuestion(quizId, questionText, questionType) {
    return await QuestionRepository.create(quizId, questionText, questionType);
  }

  static async getQuestionsByQuizId(quizId) {
    return await QuestionRepository.findByQuizId(quizId);
  }

  static async getQuestionById(id) {
    return await QuestionRepository.findById(id);
  }
}

module.exports = QuestionService;


