const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: String,
  price: Number,
  city: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);