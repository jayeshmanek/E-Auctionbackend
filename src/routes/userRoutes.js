const express = require("express");
const { registerUser, loginUser } = require("../controllers/UserController.js");

const router = express.Router();

// ✅ Browser test routes
router.get("/register", (req, res) => {
  res.send("Register API working");
});

router.get("/login", (req, res) => {
  res.send("Use POST method to login");
});

// ✅ Actual APIs
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;