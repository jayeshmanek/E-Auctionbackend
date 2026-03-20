const jwt = require("jsonwebtoken")

const secret = "secret"

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      })
    }

    // Remove "Bearer "
    const cleanToken = token.replace("Bearer ", "")

    const decoded = jwt.verify(cleanToken, secret)

    req.user = decoded   // store user data

    next()

  } catch (err) {
    res.status(401).json({
      message: "Invalid token"
    })
  }
}

module.exports = auth