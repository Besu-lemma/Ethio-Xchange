// ethioexchange-server/controllers/exchangeRate.controller.js

const ExchangeRate = require("../models/ExchangeRate");

// @desc    Create a new exchange rate
const createExchangeRate = async (req, res) => {
  try {
    const rate = await ExchangeRate.create(req.body);
    res.status(201).json(rate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all exchange rates
const getAllExchangeRates = async (req, res) => {
  try {
    const rates = await ExchangeRate.find().sort({ createdAt: -1 });
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get one exchange rate by ID
const getExchangeRateById = async (req, res) => {
  try {
    const rate = await ExchangeRate.findById(req.params.id);
    if (!rate) return res.status(404).json({ message: "Not found" });
    res.status(200).json(rate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an exchange rate
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

// @desc    Delete an exchange rate
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
