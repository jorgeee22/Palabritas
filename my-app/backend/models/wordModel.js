import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  category: { type: String, default: "general" },
});

export default mongoose.model("Word", wordSchema);
