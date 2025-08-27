const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const exchangeRateRoutes = require("./routes/exchangeRate.routes");
const bankRoutes = require("./routes/bank.routes");
const errorHandler = require("./middleware/errorHandler.js");
const authRoutes = require("./routes/auth.routes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
//error handler
app.use(errorHandler);

// Test route
const testRoutes = require("./routes/test.routes");
app.use("/api/test", testRoutes);
app.use("/api/exchangeRate", exchangeRateRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
