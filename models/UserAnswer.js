

class UserAnswer {
  constructor(id, userId, questionId, selectedOptionId, answerText, isCorrect) {
    this.id = id;
    this.userId = userId;
    this.questionId = questionId;
    this.selectedOptionId = selectedOptionId;
    this.answerText = answerText;
    this.isCorrect = isCorrect;
  }
}

module.exports = UserAnswer;


