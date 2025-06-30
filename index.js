const express = require("express");
const AuthController = require("./controllers/AuthController");
const ArticleController = require("./controllers/ArticleController");
const QuizController = require("./controllers/QuizController");
const QuestionController = require("./controllers/QuestionController");
const OptionController = require("./controllers/OptionController");
const UserAnswerController = require("./controllers/UserAnswerController");
const BadgeController = require("./controllers/BadgeController");
const authenticateToken = require("./middleware/authMiddleware");
const cors = require('cors');

const pool = require("./database"); // Ensure database connection is initialized

const app = express();

// Configuração do CORS antes de qualquer outra coisa
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Permitir apenas o frontend no localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Permitir cookies de terceiros (como o JWT)
}));

app.use(express.json()); // Para fazer o parsing de JSON no corpo da requisição

// Authentication Routes (públicas)
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

app.get("/articles", ArticleController.getAllArticles);
app.get("/badges", BadgeController.getAllBadges);
app.get("/badges/:id", BadgeController.getBadgeById);

// Middleware de autenticação JWT (deve vir depois de as rotas públicas)
app.use(authenticateToken);

// Rotas protegidas - só acessíveis após autenticação
app.get("/user", AuthController.getUserData);
app.get("/user/progress", AuthController.getUserProgress);
app.put("/user/xp", AuthController.setUserXP);
app.post("/user/xp", AuthController.addUserXP);

// Rotas de badges do usuário
app.get("/user/badges", BadgeController.getUserBadges);
app.post("/user/badges", BadgeController.awardBadgeToUser);

// Rotas administrativas de badges
app.post("/badges", BadgeController.createBadge);
app.post("/admin/users/:userId/badges", BadgeController.awardBadgeToSpecificUser);

app.post("/articles", ArticleController.createArticle);
app.get("/articles/:id", ArticleController.getArticleById);

app.post("/quizzes", QuizController.createQuiz);
app.get("/articles/:articleId/quizzes", QuizController.getQuizzesByArticleId);
app.get("/quizzes/:id", QuizController.getQuizById);
app.post("/quizzes/submit", QuizController.submitQuiz);

app.post("/questions", QuestionController.createQuestion);
app.get("/quizzes/:quizId/questions", QuestionController.getQuestionsByQuizId);
app.get("/questions/:id", QuestionController.getQuestionById);

app.post("/options", OptionController.createOption);
app.get("/questions/:questionId/options", OptionController.getOptionsByQuestionId);
app.get("/options/:id", OptionController.getOptionById);

app.post("/user-answers", UserAnswerController.createUserAnswer);
app.get("/user-answers/:userId/:questionId", UserAnswerController.getUserAnswer);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});