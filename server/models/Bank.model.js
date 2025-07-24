const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true,
    },
    code: {
        type: String,
        required: false,
        uppercase: true,
        trim: true,
        unique: true,
    },
    logourl: {
        type: String,
        required: true,
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
}, {
    timestamps: true,
    collection: "banks",
});

const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;