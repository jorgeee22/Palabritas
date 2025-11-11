import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
thematicProgress: {
    deportes: { type: Number, default: 0 },
    ciencia: { type: Number, default: 0 },
    peliculas: { type: Number, default: 0 },
    animales: { type: Number, default: 0 },
    comida: { type: Number, default: 0 },
    paises: { type: Number, default: 0 },
    nombres: { type: Number, default: 0 },
    historia: { type: Number, default: 0 },

  },
});

export default mongoose.model("User", userSchema);
