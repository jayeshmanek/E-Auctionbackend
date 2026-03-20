const User = require("../Models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secret123";

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    console.log("Register API hit"); // ✅ DEBUG LINE

    const { name, email, password } = req.body;
    console.log("Request Body:", req.body); // optional debug

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered",
      user
    });

  } catch (err) {
    console.log("Error:", err.message); // debug
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    console.log("Login API hit"); // optional debug

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };