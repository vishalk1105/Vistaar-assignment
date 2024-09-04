const express = require("express");
const { userLogin } = require("../controller/userController.js");
const userRouter = express.Router();

userRouter.post("/login", userLogin);
module.exports = userRouter;
