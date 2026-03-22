const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/DB.js");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// ✅ ROUTES
const userRoutes = require("./src/routes/userRoutes.js");
const carRoutes = require("./src/routes/carRoutes.js");
const propertyRoutes = require("./src/routes/propertyRoutes.js");

// ❌ REMOVE (conflict create karega)
// const industrialRoutes = require("./src/routes/industrialRoutes");
// const commercialRoutes = require("./src/routes/commercialRoutes");

app.use("/api/users", userRoutes);
app.use("/api", carRoutes);

// 🔥 FINAL FIX
app.use("/api", propertyRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});