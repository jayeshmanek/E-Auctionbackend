const Commercial = require("../Models/CommercialPropertyModel");

// ADD
const addCommercial = async (req, res) => {
  try {
    const data = await Commercial.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getCommercial = async (req, res) => {
  try {
    const data = await Commercial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getCommercialById = async (req, res) => {
  try {
    const data = await Commercial.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCommercial,
  getCommercial,
  getCommercialById
};