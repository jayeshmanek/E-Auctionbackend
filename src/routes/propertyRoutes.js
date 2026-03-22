const express = require("express");
const router = express.Router();

const {
  getProperties,
  getPropertyById,
  addProperty,
  getIndustrialCount,
  getAllTypeCounts
} = require("../controllers/propertyController");


// =====================================================
// 🔥 MAIN APIs
// =====================================================

// ✅ ALL + FILTER (category + status + search + pagination)
router.get("/properties", getProperties);

// ✅ SINGLE
router.get("/properties/:id", getPropertyById);

// ✅ ADD
router.post("/properties", addProperty);


// =====================================================
// 🔥 CATEGORY APIs
// =====================================================

router.get("/properties/residential", (req, res, next) => {
  req.query.category = "Residential";
  next();
}, getProperties);

router.get("/properties/commercial", (req, res, next) => {
  req.query.category = "Commercial";
  next();
}, getProperties);

router.get("/properties/industrial", (req, res, next) => {
  req.query.category = "Industrial";
  next();
}, getProperties);

router.get("/properties/scrap", (req, res, next) => {
  req.query.category = "Scrap";
  next();
}, getProperties);

router.get("/properties/gold", (req, res, next) => {
  req.query.category = "Gold";
  next();
}, getProperties);


// =====================================================
// 🔥 STATUS APIs
// =====================================================

router.get("/properties/status/live", (req, res, next) => {
  req.query.status = "live";
  next();
}, getProperties);

router.get("/properties/status/old", (req, res, next) => {
  req.query.status = "old";
  next();
}, getProperties);

router.get("/properties/status/upcoming", (req, res, next) => {
  req.query.status = "upcoming";
  next();
}, getProperties);


// =====================================================
// 🔥 COMBINED APIs (NEW 🔥🔥)
// =====================================================

// 👉 Commercial + Live
router.get("/properties/commercial/live", (req, res, next) => {
  req.query.category = "Commercial";
  req.query.status = "live";
  next();
}, getProperties);

// 👉 Industrial + Old
router.get("/properties/industrial/old", (req, res, next) => {
  req.query.category = "Industrial";
  req.query.status = "old";
  next();
}, getProperties);

// 👉 Residential + Upcoming
router.get("/properties/residential/upcoming", (req, res, next) => {
  req.query.category = "Residential";
  req.query.status = "upcoming";
  next();
}, getProperties);


// =====================================================
// 🔥 COUNT APIs
// =====================================================

// Industrial Count
router.get("/properties/count/industrial", getIndustrialCount);

// All Category Count
router.get("/properties/count/all", getAllTypeCounts);


module.exports = router;