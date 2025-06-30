const BadgeService = require("../services/BadgeService");

class BadgeController {
  // GET /badges - Listar todos os badges disponíveis
  static async getAllBadges(req, res) {
    try {
      const badges = await BadgeService.getAllBadges();
      res.status(200).json(badges);
    } catch (error) {
      console.error("Error getting all badges:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  // GET /badges/:id - Obter badge específico por ID
  static async getBadgeById(req, res) {
    const { id } = req.params;
    try {
      const badge = await BadgeService.getBadgeById(id);
      if (!badge) {
        return res.status(404).json({ message: "Badge not found." });
      }
      res.status(200).json(badge);
    } catch (error) {
      console.error("Error getting badge by ID:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  // GET /user/badges - Obter badges do usuário logado
  static async getUserBadges(req, res) {
    try {
      const userId = req.user.userId; // From JWT middleware
      const badges = await BadgeService.getUserBadges(userId);
      res.status(200).json(badges);
    } catch (error) {
      console.error("Error getting user badges:", error.message);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  // POST /user/badges - Atribuir badge a um usuário
  static async awardBadgeToUser(req, res) {
    try {
      const userId = req.user.userId; // From JWT middleware
      const { badgeId } = req.body;

      if (!badgeId) {
        return res.status(400).json({ message: "Badge ID is required." });
      }

      const result = await BadgeService.awardBadgeToUser(userId, badgeId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error awarding badge to user:", error.message);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found." });
      } else if (error.message === "Badge not found") {
        res.status(404).json({ message: "Badge not found." });
      } else if (error.message === "User already has this badge") {
        res.status(409).json({ message: "User already has this badge." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  // POST /badges - Criar um novo badge (admin)
  static async createBadge(req, res) {
    const { badgeName, description, imageUrl, thresholdXp } = req.body;

    if (!badgeName) {
      return res.status(400).json({ message: "Badge name is required." });
    }

    try {
      const badgeId = await BadgeService.createBadge(badgeName, description, imageUrl, thresholdXp);
      res.status(201).json({ 
        message: "Badge created successfully!", 
        badgeId 
      });
    } catch (error) {
      console.error("Error creating badge:", error.message);
      if (error.message.includes("duplicate key")) {
        res.status(409).json({ message: "Badge name already exists." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  // POST /admin/users/:userId/badges - Atribuir badge a um usuário específico (admin)
  static async awardBadgeToSpecificUser(req, res) {
    const { userId } = req.params;
    const { badgeId } = req.body;

    if (!badgeId) {
      return res.status(400).json({ message: "Badge ID is required." });
    }

    try {
      const result = await BadgeService.awardBadgeToUser(parseInt(userId), badgeId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error awarding badge to specific user:", error.message);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found." });
      } else if (error.message === "Badge not found") {
        res.status(404).json({ message: "Badge not found." });
      } else if (error.message === "User already has this badge") {
        res.status(409).json({ message: "User already has this badge." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }
}

module.exports = BadgeController; 