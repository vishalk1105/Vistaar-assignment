const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/dbConnection.js");
const userRouter = require("./routes/userRoutes.js");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
const productRouter = require("./routes/productRoute.js");
const bankAccRouter = require("./routes/bankAccountRoute.js");
const customerRouter = require("./routes/customerRoute.js");
const transactionRouter = require("./routes/transactionRoute.js");
const Transaction = require("./models/transactionModel.js");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
connectDB();

app.use("/user", userRouter);
app.use("/bank-account", bankAccRouter);
app.use("/transaction", transactionRouter);
app.use("/", productRouter);
app.use("/customer", customerRouter);

app.use("/api", async (req, res) => {
  console.log("Received request for accounts with transactions below 5000");
  try {
    const accounts = await Transaction.aggregate([
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
    console.log("Query results:", accounts);
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(400).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`App  is listening on ${PORT}`);
});
