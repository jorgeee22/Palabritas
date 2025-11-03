import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  points: { type: Number, required: true },
  attempts: { type: Number, required: false },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Score", scoreSchema);
