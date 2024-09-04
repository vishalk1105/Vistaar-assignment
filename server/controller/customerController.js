const Customer = require("../models/customerModel");

const createCustomer = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new Customer({
      name,
      email,
      address,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const users = await Customer.find().populate("accounts");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCustomer, getAllCustomers };
