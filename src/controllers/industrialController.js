const IndustrialProperty = require("../Models/IndustrialPropertyModel");

// ✅ ADD PROPERTY
const addIndustrialProperty = async (req, res) => {
  try {
    const property = await IndustrialProperty.create(req.body);
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL + FILTER + SEARCH
const getIndustrialProperties = async (req, res) => {
  try {
    const {
      city,
      type,
      minPrice,
      maxPrice,
      status,
      page = 1,
      limit = 5
    } = req.query;

    let filter = {};

    if (city) filter.city = city;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (minPrice || maxPrice) {
      filter.reservePrice = {};
      if (minPrice) filter.reservePrice.$gte = Number(minPrice);
      if (maxPrice) filter.reservePrice.$lte = Number(maxPrice);
    }

    const properties = await IndustrialProperty.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET SINGLE
const getIndustrialPropertyById = async (req, res) => {
  try {
    const property = await IndustrialProperty.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addIndustrialProperty,
  getIndustrialProperties,
  getIndustrialPropertyById
};