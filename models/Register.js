const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  totalRegister: Number,
  womanRegister: Number,
  manRegister: Number,
  userNames: { type: Array, default: [] }
});

module.exports = mongoose.model("Register", registerSchema);