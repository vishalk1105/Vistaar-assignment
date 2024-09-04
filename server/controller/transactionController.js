const BankAccount = require("../models/bankAccountModel");
const Transaction = require("../models/transactionModel");

const addTransaction = async (req, res) => {
  const { accountId, type, amount, description } = req.body;

  try {
    const account = await BankAccount.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    const newTransaction = new Transaction({
      accountId,
      type,
      amount,
      description,
    });

    const savedTransaction = await newTransaction.save();

    if (type === "credit") {
      account.balance += amount;
    } else if (type === "debit") {
      if (account.balance < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }
      account.balance -= amount;
    }

    account.transactions.push(savedTransaction._id);
    await account.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransaction = async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await BankAccount.findById(accountId).populate(
      "transactions"
    );
    if (!account)
      return res.status(404).json({ error: "Bank account not found" });

    res.status(200).json(account.transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTransaction,
  addTransaction,
};
