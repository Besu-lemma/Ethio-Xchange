const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const exchangeRateRoutes = require("./routes/exchangeRate.routes");
const bankRoutes = require("./routes/bank.routes");
import errorHandler from "./middleware/errorHandler.js";

app.use(errorHandler);
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
const testRoutes = require("./routes/test.routes");
app.use("/api/test", testRoutes);
app.use("/api/exchangeRate", exchangeRateRoutes);
app.use("/api/bank", bankRoutes);
// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});