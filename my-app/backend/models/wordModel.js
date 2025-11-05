import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  dateKey: { type: String, required: true, unique: true }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Word", wordSchema);
