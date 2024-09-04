const express = require("express");
const {
  createAccount,
  getAllBankAccounts,
  getAccountsWithTransactionsBelowAmount,
} = require("../controller/bankAccountController");

const bankAccRouter = express.Router();

bankAccRouter.post("/", createAccount);
bankAccRouter.get("/:userId", getAllBankAccounts);
module.exports = bankAccRouter;
