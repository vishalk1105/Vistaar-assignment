const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const User = require("../models/userModel");

const userLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const idToken = await admin.auth().verifyIdToken(token);
    const id = idToken.uid;

    let user = await User.findOne({ uid: id });
    if (!user) {
      user = new User({
        uid: id,
        email: idToken.email,
        name: idToken.name,
        address: idToken.address,
      });
      await user.save();
    }
    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

module.exports = { userLogin };
