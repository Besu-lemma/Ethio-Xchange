const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    createBank,
    updateBank,
    deleteBank,
    getAllBank,
    getBankByID,
} = require("../controllers/bank.controllers");

router.get("/", getAllBank);
router.post(
    "/",

    [
        body("name").notEmpty().withMessage("Bank name is required"),
        body("logoUrl").isURL().withMessage("Valid logo URL required"),
    ],
    createBank
);
router.get("/:id", getBankByID);
router.put("/:id", updateBank);
router.delete("/:id", deleteBank);

module.exports = router;