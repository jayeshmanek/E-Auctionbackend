const mongoose = require("mongoose")
require("dotenv").config()

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log("✅ MongoDB Connected for E-Auction")
    } catch (error) {
        console.error("❌ DB Connection Failed:", error.message)
        process.exit(1)
    }
}

module.exports = DBConnection