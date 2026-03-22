const express = require("express");
const router = express.Router();

const {
  addCommercial,
  getCommercial,
  getCommercialById
} = require("../controllers/commercialController");

router.post("/commercials", addCommercial);
router.get("/commercials", getCommercial);
router.get("/commercials/:id", getCommercialById);

module.exports = router;