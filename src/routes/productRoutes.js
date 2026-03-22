const express = require("express");
const router = express.Router();

const {
  getProperties,
  getPropertyById,
  addProperty
} = require("../controllers/propertyController");

router.get("/properties", getProperties);
router.get("/properties/:id", getPropertyById);
router.post("/properties", addProperty);

module.exports = router;