const Property = require("../models/PropertyModel");

// ✅ GET ALL + SEARCH + FILTER + PAGINATION + STATUS + CATEGORY
const getProperties = async (req, res) => {
  try {
    const {
      city,
      type,
      category, // ✅ NEW
      minPrice,
      maxPrice,
      status,
      page = 1,
      limit = 5
    } = req.query;

    let filter = {};

    // 🔥 STATUS FILTER
    if (status) filter.status = status;

    // 🔥 CATEGORY FILTER (NEW)
    if (category) filter.category = category;

    // 🔍 FILTER
    if (city) filter.city = city;
    if (type) filter.type = type;

    // 💰 PRICE FILTER (FIXED)
    if (minPrice || maxPrice) {
      filter.reservePrice = {}; // ✅ FIX (price → reservePrice)
      if (minPrice) filter.reservePrice.$gte = Number(minPrice);
      if (maxPrice) filter.reservePrice.$lte = Number(maxPrice);
    }

    // 📄 PAGINATION
    const skip = (page - 1) * limit;

    const properties = await Property.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      properties
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET BY ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Not found" });

    res.json(property);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD PROPERTY
const addProperty = async (req, res) => {
  try {
    const data = req.body;

    let result;

    if (Array.isArray(data)) {
      result = await Property.insertMany(data);
    } else {
      const property = new Property(data);
      result = await property.save();
    }

    res.status(201).json({
      message: "Property added successfully",
      result
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =====================================================
// 🔥 CATEGORY COUNTS (UPDATED)
// =====================================================

// ✅ Industrial Count
const getIndustrialCount = async (req, res) => {
  try {
    const count = await Property.countDocuments({ category: "Industrial" }); // ✅ FIX

    res.json({
      success: true,
      category: "Industrial",
      count
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ALL CATEGORY COUNTS (BEST 🔥)
const getAllTypeCounts = async (req, res) => {
  try {
    const data = await Property.aggregate([
      {
        $group: {
          _id: "$category", // ✅ FIX (type → category)
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  addProperty,
  getIndustrialCount,
  getAllTypeCounts
};