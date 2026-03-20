const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// test route
router.get("/test", (req, res) => {
  res.send("User route working");
});

module.exports = router;