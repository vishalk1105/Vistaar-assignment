const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String },
  name: { type: String },
  address: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
