const express = require("express");
const {
  signup,
  login,
  logout,
  changePassword,
  getMe,   
} = require("../controllers/authController");

 const auth = require('../middleware/authMiddleware')

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/change-password", auth, changePassword);
router.get("/me", auth, getMe);   //  new route

module.exports = router;
