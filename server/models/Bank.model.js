const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      uppercase: true,
      trim: true,
      unique: true,
    },
    logourl: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hasAPI: {
      type: Boolean,
      default: false,
    },
    apiEndpoint: {
      type: String,
      default: "",
    },
    allowManualEntry: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "banks",
  }
);

const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;
