const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const generateToken = require("../utils/generateToken");

// ====================== GET LOGGED IN USER INFO ======================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // 🚫 prevent browser from caching the response
    res.set("Cache-Control", "no-store");

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ====================== SIGNUP ======================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // cookie config for localhost
    res
      .status(201)
      .cookie("token", generateToken(user._id, user.role), {
        httpOnly: true,
        secure: false,      // must be false for localhost
        sameSite: "lax",    // allows cross-origin localhost requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== LOGIN ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    //  cookie config for localhost
    res
      .status(200)
      .cookie("token", generateToken(user._id, user.role), {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== LOGOUT ======================
exports.logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0), sameSite: "lax" });
  res.json({ message: "Logged out successfully" });
};

// ====================== CHANGE PASSWORD ======================
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
