const express = require("express");
const router = express.Router();
const exchangeRateController = require("../controllers/exchangeRate.controller");
const auth = require("../middleware/auth");

router.get("/", exchangeRateController.getExchangeRates);
router.get("/:id", exchangeRateController.getExchangeRateById);

// 🔒 Protected: only admin can add, update, delete rates
router.post("/", auth("admin"), exchangeRateController.createExchangeRate);
router.put("/:id", auth("admin"), exchangeRateController.updateExchangeRate);
router.delete("/:id", auth("admin"), exchangeRateController.deleteExchangeRate);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// // Import controller functions (we'll implement them next)
// const {
//   createExchangeRate: createRate,
//   getAllExchangeRates: getAllRates,
//   getExchangeRateById: getRateById,
//   updateExchangeRate: updateRate,
//   deleteExchangeRate: deleteRate,
// } = require("../controllers/exchangeRate.controllers");
// const {
//   exchangeRateValidationRules,
// } = require("../validators/exchangeRate.validators");
// // Route to create a new exchange rate
// router.post("/", exchangeRateValidationRules, createRate);

// // Route to get all exchange rates
// router.get("/", getAllRates);

// // Route to get a single exchange rate by ID
// router.get("/:id", getRateById);

// // Route to update an exchange rate by ID
// router.put("/:id", updateRate);

// // Route to delete an exchange rate by ID
// router.delete("/:id", deleteRate);

// module.exports = router;
