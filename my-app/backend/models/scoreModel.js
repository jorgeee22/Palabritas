import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attempts: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Score", scoreSchema);
