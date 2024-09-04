const Product = require("../models/productModel");
const BankAccount = require("../models/bankAccountModel");
const Transaction = require("../models/transactionModel");
const mongoose = require("mongoose");

const getDistinctProducts = async (req, res) => {
  try {
    const distinctProducts = await Product.distinct("name");
    res.json(distinctProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAccountsWithTransactionsBelowAmount = async (req, res) => {
  try {
    const accountsWithLowTransactions = await Transaction.aggregate([
      {
        $match: {
          amount: { $lt: 5000 },
        },
      },
      {
        $group: {
          _id: "$accountId",
        },
      },
      {
        $project: {
          _id: 0,
          accountId: "$_id",
        },
      },
    ]);

    const accountIds = accountsWithLowTransactions.map((item) =>
      item.accountId.toString()
    );

    if (accountIds.length === 0) {
      return res.status(404).json({
        message:
          "No accounts found with transactions below the specified amount.",
      });
    }

    const bankAccounts = await BankAccount.find({ _id: { $in: accountIds } });

    res.status(200).json(bankAccounts);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDistinctProducts,
  getAccountsWithTransactionsBelowAmount,
};
