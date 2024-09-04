const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "BankAccount",
    required: true,
  },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
