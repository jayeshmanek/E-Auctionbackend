const express = require("express");
const router = express.Router();

const {
  addIndustrialProperty,
  getIndustrialProperties,
  getIndustrialPropertyById
} = require("../controllers/industrialController");

// 🔥 ROUTES
router.post("/industrials", addIndustrialProperty);
router.get("/industrials", getIndustrialProperties);
router.get("/industrials/:id", getIndustrialPropertyById);

module.exports = router;