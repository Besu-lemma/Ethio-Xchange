const express = require("express");
const router = express.Router();
const api = require("../services/publicApi.service");

// /api/public/banks
router.get("/banks", async (req, res) => {
  try {
    const { withRecentEx } = req.query;
    const data = await api.getBanks(withRecentEx === "true");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /api/public/currencies
router.get("/currencies", async (req, res) => {
  try {
    const data = await api.getCurrencies();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /api/public/rates
router.get("/rates", async (req, res) => {
  try {
    const { bankId } = req.query;
    const data = await api.getRates(bankId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /api/public/best-rates
router.get("/best-rates", async (req, res) => {
  try {
    const data = await api.getBestRates();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /api/public/history
router.get("/history", async (req, res) => {
  try {
    const { bankId, date } = req.query;
    const data = await api.getBankHistory(bankId, date);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
