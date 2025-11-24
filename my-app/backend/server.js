import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import tematicoRoutes from "./routes/tematicoRoutes.js";
import historyLevelRoutes from "./routes/historyLevelRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando en Render");
});
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/tematico", tematicoRoutes);   
app.use("/api/historia", historyLevelRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));