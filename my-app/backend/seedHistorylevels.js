import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import  HistoryLevel from "./models/historyModel.js";
dotenv.config();

const seedHistoriaLevels = async () => {
  try {
    await connectDB();

    const levels = [
      {
        id: 1,
        hint: "Gobernantes que dominaron reinos y castillos.",
        answer: "REYES",
        status: "unlocked",
      },
      {
        id: 2,
        hint: "Ciudad donde nació la democracia.",
        answer: "ATENAS",
        status: "locked",
      },
      {
        id: 3,
        hint: "Civilización que desarrolló un calendario preciso.",
        answer: "MAYAS",
        status: "locked",
      },
    ];

    await HistoryLevel.deleteMany(); // Limpia los anteriores
    await HistoryLevel.insertMany(levels);

    console.log("Niveles de historia cargados correctamente");
    process.exit();
  } catch (error) {
    console.error(" Error al insertar niveles:", error);
    process.exit(1);
  }
};

seedHistoriaLevels();
