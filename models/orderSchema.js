const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String },
      description: { type: String },
      image: { type: String },
      stock: { type: Number },
      sizes: [String],
      quantity: { type: Number, required: true },
      size: { type: String,  }
    }
  ],

  total: { type: Number, required: true },

  shippingInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },

  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
