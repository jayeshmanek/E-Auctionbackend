const registerUser = (req, res) => {
  res.send("✅ Register API working");
};

const loginUser = (req, res) => {
  res.send("✅ Login API working");
};

module.exports = { registerUser, loginUser };