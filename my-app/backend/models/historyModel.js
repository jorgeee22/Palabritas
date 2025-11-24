import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  hint: { type: String, required: true },
  answer: { type: String, required: true },
  status: {
    type: String,
    enum: ["locked", "unlocked", "completed"],
    default: "locked",
  },
  cooldownUntil: { type: Date, default: null },
});

const HistoryLevel = mongoose.model("HistoryLevel", historySchema);
export default HistoryLevel;
