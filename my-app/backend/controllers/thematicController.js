import Theme from "../models/themeModel.js";
import User from "../models/userModel.js";
export const getWordByTheme = async (req, res) => {
    try{
        const {tema} = req.query;
        const userId = req.user?.id; 

        const theme = await Theme.findOne({name: tema});
        if (!theme) return res.status(404).json({message: "Tema no encontrado"});

        if (!userId) {
           return getWordNoSession(theme, tema, res);
        }

     const user = await User.findById(userId);
       if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
        }

      return getNextAvailableWord(theme, user, tema, res);

  } catch (error) {
    console.error("Error al obtener palabra temática:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUserProgress = async (req, res) => {
    try{
   const {word, tema} = req.body;
   const userId = req.user.id; 

    if (!tema || !word) {
      return res.status(400).json({ message: "Tema y palabra son requeridos" });
    }

   const user = await User.findById(userId);
   if (!user) return res.status(400).json({message: "Usuario no encontrado"});

   if (!user.thematicProgress[tema]) {
      return res.status(400).json({ message: "Tema inválido" });
    }

     const progress = user.thematicProgress[tema];

    if (!progress.discovered.includes(word.toUpperCase())) {
      progress.discovered.push(word.toUpperCase());
      progress.count += 1;
      await user.save();
      console.log(`Progreso actualizado: ${tema} → ${progress.count}`);
    } else {
      console.log(`La palabra ${word} ya estaba registrada en ${tema}`);
    }

    res.json({
      message: "Progreso actualizado correctamente",
      thematicProgress: user.thematicProgress[tema],
    });
  } catch (error) {
    console.error("Error al actualizar progreso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


function getWordNoSession(theme, tema, res){
    const randomWord = theme.words[Math.floor(Math.random() * theme.words.length)].toUpperCase();
      console.log(`Palabra del tema ${tema} (sin sesión):`, randomWord);

  return res.json({ word: randomWord });
}

function getNextAvailableWord(theme, user, tema, res) {
  const themeProgress = user.thematicProgress[tema];
  const discoveredWords = themeProgress?.discovered || [];

  // Filtrar palabras no descubiertas
  const availableWords = theme.words.filter(
    (word) => !discoveredWords.includes(word.toUpperCase())
  );

  // Si ya completó todas las palabras del tema
  if (availableWords.length === 0) {
    console.log(`Tema ${tema} completado por ${user.name}`);
    return res.status(200).json({
      message: "Tema completado",
      word: null,
      completed: true,
    });
  }

  // Elegir palabra aleatoria
  const randomWord =
    availableWords[Math.floor(Math.random() * availableWords.length)].toUpperCase();

  console.log(`Palabra del tema ${tema}:`, randomWord);

  return res.json({
    word: randomWord,
    completed: false,
    remaining: availableWords.length - 1,
  });
}
