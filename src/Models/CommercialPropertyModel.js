const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema({
  title: String,
  description: String,

  type: {
    type: String, // Shop / Office / Showroom
    required: true
  },

  city: String,
  state: String,

  reservePrice: Number,
  auctionDate: Date,

  auctionId: String,
  image: String,

  status: {
    type: String,
    enum: ["upcoming", "live", "sold"],
    default: "upcoming"
  }

}, { timestamps: true });

module.exports = mongoose.model("CommercialProperty", commercialSchema);