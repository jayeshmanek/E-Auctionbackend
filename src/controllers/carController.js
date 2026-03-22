const Car = require("../Models/CarModel");

// ✅ GET ALL + SEARCH + FILTER
const getCars = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;

    let filter = {};

    // 🔥 case-insensitive city search
    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    // 🔥 price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });

    res.json(cars);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET BY ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD CAR
const addCar = async (req, res) => {
  try {
    const { title, price, city, image, color, year } = req.body;

    // 🔥 basic validation
    if (!title || !price || !city) {
      return res.status(400).json({ message: "Title, price, city required" });
    }

    const car = new Car({
      title,
      price,
      city,
      image,
      color,
      year
    });

    const saved = await car.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCars, getCarById, addCar };