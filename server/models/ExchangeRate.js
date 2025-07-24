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
        rates: {
            type: Number,
            required: true,
            min: 0,
        },
        provider: {
            type: String,
            required: false,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },

    {
        timestamps: true,
    }
);

const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);

module.exports = ExchangeRate;