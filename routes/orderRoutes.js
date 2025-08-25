const express = require("express")
const app = express();
const {getMyOrders,placeOrder} =  require("../controllers/orderCollections");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

// orderRoutes

router.get("/",authMiddleware,getMyOrders)

router.post("/",authMiddleware,placeOrder);

module.exports = router;
