const mongoose = require("mongoose");

const industrialPropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  type: {
    type: String, // Factory / Shed / Godown
    required: true
  },

  city: {
    type: String,
    required: true
  },

  state: String,

  reservePrice: {
    type: Number,
    required: true
  },

  auctionDate: {
    type: Date,
    required: true
  },

  auctionId: {
    type: String,
    unique: true
  },

  image: String,

  status: {
    type: String,
    enum: ["upcoming", "live", "sold"],
    default: "upcoming"
  }

}, { timestamps: true });

module.exports = mongoose.model("IndustrialProperty", industrialPropertySchema);