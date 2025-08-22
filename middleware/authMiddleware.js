const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.cookies.token; // ✅ read from cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Make sure req.user has an id (matches your controller)
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;

