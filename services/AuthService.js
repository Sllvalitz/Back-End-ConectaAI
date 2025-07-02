const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Use a strong, random secret in production

class AuthService {
  static async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserRepository.create(username, email, hashedPassword);
    await UserRepository.initializeProgress(userId);
    return userId;
  }

  static async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return null; // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return null; // Password mismatch
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { userId: user.id, token };
  }

  static async getUserData(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async setUserXP(userId, xp) {
    // Verificar se o usuário existe
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Calcular o novo level baseado no XP (100 XP por level)
    const newLevel = Math.floor(xp / 100) + 1;
    
    // Atualizar o progresso do usuário com o valor absoluto
    await UserRepository.updateUserProgress(userId, xp, newLevel);
    
    // Retornar o progresso atualizado
    return await UserRepository.getUserProgress(userId);
  }

  static async addUserXP(userId, xpToAdd) {
    // Verificar se o usuário existe
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Obter o progresso atual
    const currentProgress = await UserRepository.getUserProgress(userId);
    if (!currentProgress) {
      throw new Error("User progress not found");
    }

    // Calcular o novo XP (XP atual + XP a adicionar)
    const newXp = currentProgress.xp + xpToAdd;
    
    // Calcular o novo level baseado no XP total (100 XP por level)
    const newLevel = Math.floor(newXp / 100) + 1;
    
    // Atualizar o progresso do usuário
    await UserRepository.updateUserProgress(userId, newXp, newLevel);
    
    // Retornar o progresso atualizado
    return await UserRepository.getUserProgress(userId);
  }

  static async getUserProgress(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await UserRepository.getUserProgress(userId);
  }
}

module.exports = AuthService;


