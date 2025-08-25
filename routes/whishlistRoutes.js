const express = require("express");
const app = express();

const authMiddleware = require("../middleware/authMiddleware");

const {addToWhishlist,moveToCart,removeFromWishlist,getWhishlist}  = require("../controllers/whishlistController")

const routes = express.Router();


//Whishlist Routes;

routes.get("/",authMiddleware,getWhishlist) //get whishlist
routes.post("/add",authMiddleware,addToWhishlist) // add item to whishlist
routes.post("/moveToCart/:productId",authMiddleware,moveToCart) // move to cart from whihslist
routes.delete("/:productId",authMiddleware,removeFromWishlist) /// remove item from wishliist

module.exports = routes;
