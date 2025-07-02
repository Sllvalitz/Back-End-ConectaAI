

const OptionRepository = require("../repositories/OptionRepository");

class OptionService {
  static async createOption(questionId, optionText, isCorrect) {
    return await OptionRepository.create(questionId, optionText, isCorrect);
  }

  static async getOptionsByQuestionId(questionId) {
    return await OptionRepository.findByQuestionId(questionId);
  }

  static async getOptionById(id) {
    return await OptionRepository.findById(id);
  }
}

module.exports = OptionService;


