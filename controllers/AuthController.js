const AuthService = require("../services/AuthService");

class AuthController {
  static async register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    try {
      const userId = await AuthService.register(username, email, password);
      res.status(201).json({ message: "User registered successfully!", userId: userId });
    } catch (error) {
      console.error("Error registering user:", error.message);
      if (error.message.includes("duplicate key")) {
        res.status(409).json({ message: "Username or email already exists." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    try {
      const result = await AuthService.login(email, password);
      if (!result) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      res.status(200).json({ message: "Login successful!", token: result.token, userId: result.userId });
    } catch (error) {
      console.error("Error logging in user:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  static async getUserData(req, res) {
    try {
      const userId = req.user.userId; // From JWT middleware
      const user = await AuthService.getUserData(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user data:", error.message);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  static async setUserXP(req, res) {
    try {
      const userId = req.user.userId; // From JWT middleware
      const { xp } = req.body;
      
      if (xp === undefined || xp === null) {
        return res.status(400).json({ message: "XP value is required." });
      }
      
      if (typeof xp !== 'number' || xp < 0) {
        return res.status(400).json({ message: "XP must be a positive number." });
      }
      
      const updatedProgress = await AuthService.setUserXP(userId, xp);
      res.status(200).json({ 
        message: "XP set successfully!", 
        progress: updatedProgress 
      });
    } catch (error) {
      console.error("Error setting user XP:", error.message);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  static async addUserXP(req, res) {
    try {
      const userId = req.user.userId; // From JWT middleware
      const { xp } = req.body;
      
      if (xp === undefined || xp === null) {
        return res.status(400).json({ message: "XP value is required." });
      }
      
      if (typeof xp !== 'number' || xp < 0) {
        return res.status(400).json({ message: "XP must be a positive number." });
      }
      
      const updatedProgress = await AuthService.addUserXP(userId, xp);
      res.status(200).json({ 
        message: `${xp} XP added successfully!`, 
        progress: updatedProgress 
      });
    } catch (error) {
      console.error("Error adding user XP:", error.message);
      if (error.message === "User not found" || error.message === "User progress not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }

  static async getUserProgress(req, res) {
    try {
      const userId = req.user.userId; // From JWT middleware
      const progress = await AuthService.getUserProgress(userId);
      
      if (!progress) {
        return res.status(404).json({ message: "User progress not found." });
      }
      
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error getting user progress:", error.message);
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found." });
      } else {
        res.status(500).json({ message: "Internal server error." });
      }
    }
  }
}

module.exports = AuthController;


