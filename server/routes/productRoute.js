const express = require("express");
const {
  getDistinctProducts,
  getAccountsWithTransactionsBelowAmount,
} = require("../controller/productController.js");

const productRouter = express.Router();

productRouter.get("/distinct-products", getDistinctProducts);
productRouter.get(
  "/accounts_below_5000",
  getAccountsWithTransactionsBelowAmount
);
module.exports = productRouter;
