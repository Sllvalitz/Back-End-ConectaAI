
const ArticleService = require("../services/ArticleService");

class ArticleController {
  static async createArticle(req, res) {
    const { title, content, imageUrl, slug, overviewTitle, overviewContent } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }
    try {
      const articleId = await ArticleService.createArticle(
        title, 
        content,
        imageUrl,
        slug,
        overviewTitle,
        overviewContent
      );
      res.status(201).json({ message: "Article created successfully!", articleId });
    } catch (error) {
      console.error("Error creating article:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getAllArticles(req, res) {
    try {
      const articles = await ArticleService.getAllArticles();
      res.status(200).json(articles);
    } catch (error) {
      console.error("Error getting articles:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getArticleById(req, res) {
    const { id } = req.params;
    try {
      const article = await ArticleService.getArticleById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found." });
      }
      res.status(200).json(article);
    } catch (error) {
      console.error("Error getting article by ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = ArticleController;


