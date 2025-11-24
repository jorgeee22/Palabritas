import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  // 👇 Guarda referencia real al usuario (ObjectId)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  attempts: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Score", scoreSchema);
