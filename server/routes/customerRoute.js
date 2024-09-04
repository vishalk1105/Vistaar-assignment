const express = require("express");
const {
  createCustomer,
  getAllCustomers,
} = require("../controller/customerController");

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);
customerRouter.get("/", getAllCustomers);
module.exports = customerRouter;
