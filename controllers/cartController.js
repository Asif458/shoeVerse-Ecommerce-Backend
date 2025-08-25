const Cart = require("../models/cartSchema")

//  Get all items for a user + subtotal + total
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate(
      "productId",
      "name price image"
    );

    // calculate totals
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    res.json({
      cartItems,
      subtotal,
      shipping: "Free",
      total: subtotal, // you can add shipping charge if needed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//add product to cart
const addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  const userId = req.user.id;

  try {
    // check if item already exists (same product + same size + same user)
    let cartItem = await Cart.findOne({ userId, productId, size });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId,
        productId,
        size,
        quantity: quantity || 1,
      });
    }

    await cartItem.populate("productId", "name price image");
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 

// PUTUpdate quantity
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { quantity: Math.max(1, quantity) }, // ensure min 1
      { new: true }
    ).populate("productId", "name price image");

    if (!cartItem) return res.status(404).json({ message: "Item not found" });

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//  Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

    res.json({ message: "Cart item removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addToCart,getCart,updateCart,removeFromCart}

 


 




 












 
 
