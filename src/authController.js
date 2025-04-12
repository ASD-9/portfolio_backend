const User = require("./userModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "❌ Nom d'utilisateur ou mot de passe incorrect" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "❌ Nom d'utilisateur ou mot de passe incorrect" });
    }

    const userInfo = user.toObject();
    delete userInfo.password;

    res.status(200).json({ message: "✅ Connexion réussie", data: userInfo });
  } catch (error) {
    res.status(500).json({ message: "💥 Problème interne au serveur, réessayez plus tard.", error: error.message });
  }
}

const register = async (req, res) => {
  try {
    const { username, password, companyName, description, reason, adminPassword } = req.body;

    const passwordMatch = await bcrypt.compare(adminPassword, process.env.ADMIN_PASSWORD);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe de l'administrateur incorrect" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, companyName, description, reason });
    await user.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

module.exports = {
  login,
  register
};
