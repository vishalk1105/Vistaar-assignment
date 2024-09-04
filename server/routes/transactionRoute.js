const express = require("express");
const {
  getTransaction,
  addTransaction,
} = require("../controller/transactionController");
const transactionRouter = express.Router();

transactionRouter.get("/:accountId", getTransaction);
transactionRouter.post("/", addTransaction);
module.exports = transactionRouter;
