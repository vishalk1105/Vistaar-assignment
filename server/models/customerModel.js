const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  accounts: [{ type: Schema.Types.ObjectId, ref: "BankAccount" }],
});

module.exports = mongoose.model("Customer", customerSchema);
