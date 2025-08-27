const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
    fromCurrency: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    toCurrency: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    rate: {
        type: Number,
        required: true,
        min: 0,
    },

    // Who provided this rate?
    providerType: {
        type: String,
        enum: ["manual", "bank", "api"],
        default: "manual",
    },
    providerBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank", // Link to Bank model
        required: function() {
            return this.providerType === "bank";
        },
    },

    // When is this rate valid?
    validAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Indexes for performance and uniqueness
exchangeRateSchema.index({
    fromCurrency: 1,
    toCurrency: 1,
    providerType: 1,
    providerBank: 1,
    validAt: 1,
}, { unique: true });

const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);
module.exports = ExchangeRate;