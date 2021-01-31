const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  guildId: String,
  userId: String,
  totalRegister: Number,
  womanRegister: Number,
  manRegister: Number,
  userNames: { type: Array, default: [] }
});

module.exports = mongoose.model("Register", registerSchema);
