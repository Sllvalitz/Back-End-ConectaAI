const BadgeRepository = require("../repositories/BadgeRepository");
const UserRepository = require("../repositories/UserRepository");

class BadgeService {
  // Obter todos os badges disponíveis
  static async getAllBadges() {
    return await BadgeRepository.findAll();
  }

  // Obter badge por ID
  static async getBadgeById(id) {
    return await BadgeRepository.findById(id);
  }

  // Obter badges de um usuário
  static async getUserBadges(userId) {
    // Verificar se o usuário existe
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return await BadgeRepository.findByUserId(userId);
  }

  // Atribuir badge a um usuário
  static async awardBadgeToUser(userId, badgeId) {
    // Verificar se o usuário existe
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Verificar se o badge existe
    const badge = await BadgeRepository.findById(badgeId);
    if (!badge) {
      throw new Error("Badge not found");
    }

    // Verificar se o usuário já tem o badge
    const userHasBadge = await BadgeRepository.userHasBadge(userId, badgeId);
    if (userHasBadge) {
      throw new Error("User already has this badge");
    }

    // Atribuir o badge
    await BadgeRepository.awardBadgeToUser(userId, badgeId);

    return {
      message: "Badge awarded successfully!",
      badge: badge,
      user: user
    };
  }

  // Criar um novo badge
  static async createBadge(badgeName, description, imageUrl, thresholdXp) {
    return await BadgeRepository.create(badgeName, description, imageUrl, thresholdXp);
  }

  // Verificar e conceder badges automáticos baseados no XP
  static async checkAndAwardAutomaticBadges(userId) {
    const userProgress = await UserRepository.getUserProgress(userId);
    if (!userProgress) {
      return [];
    }

    // Buscar badges que o usuário pode receber baseado no XP
    const eligibleBadges = await BadgeRepository.findByThreshold(userProgress.xp);
    const awardedBadges = [];

    for (const badge of eligibleBadges) {
      const userHasBadge = await BadgeRepository.userHasBadge(userId, badge.id);
      if (!userHasBadge) {
        await BadgeRepository.awardBadgeToUser(userId, badge.id);
        awardedBadges.push(badge);
      }
    }

    return awardedBadges;
  }
}

module.exports = BadgeService; 