// bank.routes.js
const express = require("express");
const router = express.Router();
const BankController = require("../controllers/bank.controllers");
const auth = require("../middleware/auth.middleware");

// Only admin can create/update/delete banks
router.post("/", auth("admin"), BankController.createBank);
router.put("/:id", auth("admin"), BankController.updateBank);
router.delete("/:id", auth("admin"), BankController.deleteBank);

// Anyone (logged in or not) can view banks
router.get("/", BankController.getAllBank);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { body } = require("express-validator");

// const {
//     createBank,
//     updateBank,
//     deleteBank,
//     getAllBank,
//     getBankByID,
// } = require("../controllers/bank.controllers");

// router.get("/", getAllBank);
// router.post(
//     "/",

//     [
//         body("name").notEmpty().withMessage("Bank name is required"),
//         body("logoUrl").isURL().withMessage("Valid logo URL required"),
//     ],
//     createBank
// );
// router.get("/:id", getBankByID);
// router.put("/:id", updateBank);
// router.delete("/:id", deleteBank);

// module.exports = router;
