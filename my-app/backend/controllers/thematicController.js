import Theme from "../models/themeModel.js";
import User from "../models/userModel.js";
export const getRandomWordByTheme = async (req, res) => {
    try{
        const {tema} = req.query;
        const theme = await Theme.findOne({name: tema});
        
        if (!theme) return res.status(404).json({message: "Tema no encontrado"});

        const randomWord = theme.words[Math.floor(Math.random() * theme.words.length)];
        res.json({word: randomWord})

    } catch (error){
        console.error("Error al obtener palabra tematica:", error);
        res.status(500).json({message: "Error interno del servidor"});
    }
}

export const updateUserProgress = async (req, res) => {
    try{
   const {userId, tema} = req.body;
   const user = await User.findById(userId);
   if (!user) return res.status(400).json({message: "Usuario no encontrado"});

   user.thematicProgress[tema] = (user.thematicProgress[tema] || 0) + 1;
   await user.save();

   res.json({message: "Progreso actualizado", progress: user.thematicProgress});
    } catch (error){
    console.error("Error actualizando progreso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    }
};