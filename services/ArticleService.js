
const ArticleRepository = require("../repositories/ArticleRepository");

class ArticleService {
  static async createArticle(title, content, imageUrl, slug, overviewTitle, overviewContent) {
    return await ArticleRepository.create(title, content, imageUrl, slug, overviewTitle, overviewContent);
  }

  static async getAllArticles() {
    return await ArticleRepository.findAll();
  }

  static async getArticleById(id) {
    return await ArticleRepository.findById(id);
  }
}

module.exports = ArticleService;


