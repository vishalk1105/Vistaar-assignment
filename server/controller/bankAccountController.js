const BankAccount = require("../models/bankAccountModel");
const Customer = require("../models/customerModel");
const Transaction = require("../models/transactionModel");
const createAccount = async (req, res) => {
  const { userId, accountNumber, initialBalance } = req.body;

  try {
    const user = await Customer.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newAccount = new BankAccount({
      userId,
      accountNumber,
      balance: initialBalance || 0,
    });

    const savedAccount = await newAccount.save();

    user.accounts.push(savedAccount._id);
    await user.save();

    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBankAccounts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Customer.findById(userId).populate("accounts");
    console.log(user, "account details");
    if (!user) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(user.accounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAccount,
  getAllBankAccounts,
};
