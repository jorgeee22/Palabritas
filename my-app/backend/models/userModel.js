import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

    classicStreak: {
    current: { type: Number, default: 0 },
    best: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },


  // Progreso del modo temático
  thematicProgress: {
    deportes: {
      count: { type: Number, default: 0 },          
      discovered: { type: [String], default: [] },  
    },
    ciencia: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
    peliculas: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
    animales: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
    comida: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
    paises: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
    nombres: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
    historia: {
      count: { type: Number, default: 0 },
      discovered: { type: [String], default: [] },
    },
  },
});

export default mongoose.model("User", userSchema);
