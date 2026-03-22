const express = require("express");
const router = express.Router();

const { getCars, getCarById, addCar } = require("../controllers/carController");

router.get("/cars", getCars);
router.get("/cars/:id", getCarById);
router.post("/cars", addCar);

module.exports = router;