import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
 // savedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Score" }],
});

export default mongoose.model("User", userSchema);
