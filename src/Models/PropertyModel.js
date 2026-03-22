const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  // 🔹 Flat / Shop / Factory / Office
  type: {
    type: String,
    required: true,
    trim: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  state: {
    type: String,
    trim: true
  },

  // 💰 PRICE
  reservePrice: {
    type: Number,
    required: true,
    min: 0
  },

  auctionDate: {
    type: Date,
    required: true
  },

  auctionId: {
    type: String,
    unique: true,
    trim: true
  },

  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },

  // 🔥 CATEGORY (MAIN FILTER)
  category: {
    type: String,
    enum: ["Residential", "Commercial", "Industrial", "Scrap", "Gold"],
    required: true
  },

  // 🔥 STATUS (OLD / LIVE / UPCOMING)
  status: {
    type: String,
    enum: ["old", "live", "upcoming"],
    default: "upcoming"
  }

}, { timestamps: true });


// 🔥 INDEXING (FAST SEARCH 🚀)
propertySchema.index({ category: 1, status: 1 });
propertySchema.index({ city: 1 });
propertySchema.index({ reservePrice: 1 });


// 🔥 AUTO STATUS UPDATE (OPTIONAL LOGIC)
propertySchema.pre("save", function (next) {
  const today = new Date();

  if (this.auctionDate < today) {
    this.status = "old";
  }

  next();
});


module.exports = mongoose.model("Property", propertySchema);