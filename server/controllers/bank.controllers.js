const Bank = require("../models/Bank.model");
const Banks = require("../models/Bank.model");

const createBank = async(req, res) => {
    try {
        const bank = await Banks.create(req.body);
        res.status(201).json(bank);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const updateBank = async(req, res) => {
    try {
        const bank = await Banks.findByIdAndUpdate(req.params.id, req.body {
            new: true,
        });
        if (!bank) return res.status(401).json("Bank does not exist");
        res.status(201).json(bank);
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};

const deleteBank = async(req, res) => {
    try {
        const bank = await Banks.findByIdAndDelete(req.params.id);
        if (!bank) return res.status(401).json("Bank does not exist");
        res.status(201).json("bank deleted succefully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBank = async(req, res) => {
    try {
        const bank = await Bank.find.sort({ name: -1 })
        res.status(201).json(bank)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBankByID = async(req, res) => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (!bank) return res.status(404).json("Bank does not exist")
        res.status(201).json(bank)

    } catch (error) {
        res.status(501).json({ message: error.message })
    }
}

module.exports = {
    createBank,
    updateBank,
    deleteBank,
    getAllBank,
    getBankByID
}