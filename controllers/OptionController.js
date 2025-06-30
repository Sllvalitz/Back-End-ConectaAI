

const OptionService = require("../services/OptionService");

class OptionController {
  static async createOption(req, res) {
    const { questionId, optionText, isCorrect } = req.body;
    if (!questionId || !optionText) {
      return res.status(400).json({ message: "Question ID and option text are required." });
    }
    try {
      const optionId = await OptionService.createOption(questionId, optionText, isCorrect);
      res.status(201).json({ message: "Option created successfully!", optionId });
    } catch (error) {
      console.error("Error creating option:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getOptionsByQuestionId(req, res) {
    const { questionId } = req.params;
    try {
      const options = await OptionService.getOptionsByQuestionId(questionId);
      res.status(200).json(options);
    } catch (error) {
      console.error("Error getting options by question ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getOptionById(req, res) {
    const { id } = req.params;
    try {
      const option = await OptionService.getOptionById(id);
      if (!option) {
        return res.status(404).json({ message: "Option not found." });
      }
      res.status(200).json(option);
    } catch (error) {
      console.error("Error getting option by ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = OptionController;


