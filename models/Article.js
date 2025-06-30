
class Article {
  constructor(id, title, content, publishedAt, imageUrl, slug, overviewTitle, overviewContent) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.publishedAt = publishedAt;
    this.imageUrl = imageUrl;
    this.slug = slug;
    this.overviewTitle = overviewTitle;
    this.overviewContent = overviewContent;
  }
}

module.exports = Article;


