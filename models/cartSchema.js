const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // which user owns this cart item
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  }, // product in the cart
  quantity: { 
    type: Number, 
    default: 1, 
    min: 1 
  }, // minimum 1
  size: { 
    type: String, 
     
  } // shoe size
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
