// validators/exchangeRate.validator.js
const { body } = require("express-validator");

exports.exchangeRateValidationRules = [
  body("bank").notEmpty().withMessage("Bank is required"),
  body("currency").notEmpty().withMessage("Currency is required"),
  body("buy")
    .notEmpty()
    .withMessage("Buy rate is required")
    .isNumeric()
    .withMessage("Buy must be a number"),
  body("sell")
    .notEmpty()
    .withMessage("Sell rate is required")
    .isNumeric()
    .withMessage("Sell must be a number"),
];
