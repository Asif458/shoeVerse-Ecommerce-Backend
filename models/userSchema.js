const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Instead of "id", MongoDB automatically generates "_id"
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // unique email
  password: { type: String, required: true }, // should be hashed later
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isBlock: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// ✅ Export model in CommonJS
module.exports = mongoose.model("User", userSchema);
