import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
;}


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: "El usuario ya existe" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
 
  res.status(201).json({ 
    _id: user.id, 
    name: user.name, 
    token: generateToken(user.id) 
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ _id: user.id, name: user.name, token: generateToken(user.id), message: "Usuario valido"});
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// 🔹 Actualiza la racha del modo clásico
export const updateClassicStreak = async (req, res) => {
  try {
    const { won } = req.body; // `won` = true si ganó la palabra, false si perdió
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (won) {
      user.classicStreak.current += 1;
      user.classicStreak.total += 1;

      if (user.classicStreak.current > user.classicStreak.best) {
        user.classicStreak.best = user.classicStreak.current;
      }
    } else {
      user.classicStreak.current = 0; // pierde la racha
    }

    await user.save();
    res.json({ message: "Racha actualizada", classicStreak: user.classicStreak });
  } catch (error) {
    console.error("Error al actualizar la racha:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// 🔹 Devuelve logros y progreso del usuario (modo clásico + temático)
export const getUserAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Armar objeto con logros del modo clásico y temático
    const achievements = {
      classic: {
        currentStreak: user.classicStreak?.current || 0,
        bestStreak: user.classicStreak?.best || 0,
        totalWords: user.classicStreak?.total || 0,
      },
      thematic: user.thematicProgress || {},
    };

    res.status(200).json(achievements);
  } catch (error) {
    console.error("Error al obtener logros:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
