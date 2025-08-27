// controllers/exchangeRate.controller.js
const ExchangeRate = require("../models/ExchangeRate.model");

// Create
const createExchangeRate = async (req, res) => {
  try {
    const rate = await ExchangeRate.create(req.body);
    res.status(201).json(rate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all
const getAllExchangeRates = async (req, res) => {
  try {
    const rates = await ExchangeRate.find()
      .populate("providerBank", "name code logourl")
      .sort({ createdAt: -1 });
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one
const getExchangeRateById = async (req, res) => {
  try {
    const rate = await ExchangeRate.findById(req.params.id).populate(
      "providerBank",
      "name code logourl"
    );
    if (!rate) return res.status(404).json({ message: "Not found" });
    res.status(200).json(rate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
const updateExchangeRate = async (req, res) => {
  try {
    const rate = await ExchangeRate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rate) return res.status(404).json({ message: "Not found" });
    res.status(200).json(rate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
const deleteExchangeRate = async (req, res) => {
  try {
    const rate = await ExchangeRate.findByIdAndDelete(req.params.id);
    if (!rate) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExchangeRate,
  getAllExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
};
