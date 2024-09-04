const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});
module.exports = mongoose.model("BankAccount", bankAccountSchema);
