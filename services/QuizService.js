

const QuizRepository = require("../repositories/QuizRepository");
const QuestionRepository = require("../repositories/QuestionRepository");
const OptionRepository = require("../repositories/OptionRepository");
const UserAnswerRepository = require("../repositories/UserAnswerRepository");
const UserRepository = require("../repositories/UserRepository");

class QuizService {
  static async createQuiz(articleId, title, description, xpReward, badgeId) {
    return await QuizRepository.create(articleId, title, description, xpReward, badgeId);
  }

  static async getQuizzesByArticleId(articleId) {
    return await QuizRepository.findByArticleId(articleId);
  }

  static async getQuizById(id) {
    return await QuizRepository.findById(id);
  }

  static async submitQuiz(userId, quizId, answers) {
    const quiz = await QuizRepository.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found.");
    }

    let correctAnswersCount = 0;
    for (const answer of answers) {
      const question = await QuestionRepository.findById(answer.questionId);
      if (!question) {
        throw new Error(`Question with ID ${answer.questionId} not found.`);
      }

      const correctOption = await OptionRepository.findCorrectOption(answer.questionId);
      const isCorrect = correctOption && correctOption.id === answer.selectedOptionId;

      await UserAnswerRepository.create(
        userId,
        answer.questionId,
        answer.selectedOptionId,
        answer.answerText, // Will be null for multiple choice
        isCorrect
      );

      if (isCorrect) {
        correctAnswersCount++;
      }
    }

    // For simplicity, assume all questions must be answered correctly to get XP/Badge
    const questionsInQuiz = await QuestionRepository.findByQuizId(quizId);
    if (correctAnswersCount === questionsInQuiz.length) {
      // Award XP
      const userProgress = await UserRepository.getUserProgress(userId);
      const newXp = userProgress.xp + quiz.xp_reward;
      // Simple level up logic (can be more complex)
      const newLevel = Math.floor(newXp / 100) + 1; // 100 XP per level
      await UserRepository.updateUserProgress(userId, newXp, newLevel);

      // Award Badge if applicable
      if (quiz.badge_id) {
        const hasBadge = await UserRepository.hasBadge(userId, quiz.badge_id);
        if (!hasBadge) {
          await UserRepository.awardBadge(userId, quiz.badge_id);
        }
      }
      return { success: true, message: "Quiz completed successfully! XP and badge awarded." };
    } else {
      return { success: false, message: "Quiz completed, but not all answers were correct. No XP or badge awarded." };
    }
  }
}

module.exports = QuizService;


