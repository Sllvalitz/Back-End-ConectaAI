

class Option {
  constructor(id, questionId, optionText, isCorrect) {
    this.id = id;
    this.questionId = questionId;
    this.optionText = optionText;
    this.isCorrect = isCorrect;
  }
}

module.exports = Option;


