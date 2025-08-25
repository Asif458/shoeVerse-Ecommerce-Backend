const express = require('express')
const {addToCart,getCart,updateCart,removeFromCart} = require("../controllers/cartController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();


 

//cartRoutes
router.get("/",authMiddleware,getCart);
router.post("/",authMiddleware,addToCart)
router.put("/:id",authMiddleware,updateCart)
router.delete("/:id",authMiddleware,removeFromCart)

module.exports = router;