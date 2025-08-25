  const Order = require("../models/orderSchema");
  const Cart = require("../models/cartSchema");


   const placeOrder = async(req,res)=>{
    try{
        const userId = req.user.id;
        const{shippingInfo,items,total} = req.body;

        if(!items || items.length ===0){
            return res.status(400).json({message:"no items in order"})
        }

        const newOrder= await Order.create({
            userId,
            items,
            total,
            shippingInfo
            
        })

        ///clear user cart after placing order 
        await Cart.deleteMany({userId})

        res.status(201).json({message:"order placed successfully",order:newOrder})
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get all orders of logged in users
 
  const getMyOrders = async(req,res)=>{
    try{
        const userId = req.user.id;
        const orders = await Order.find({userId}).sort({createdAt:-1})
        res.json(orders)

    } catch(err){
        res.status(500).json({message:err.messsage})
    }
  }

  module.exports = {placeOrder,getMyOrders}
  
  
  
  
  
  
  
  
  
  
  
 
  
  
  
  
  
  
  
 

// //   Place Order
// const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { shippingInfo, items, total } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in order" });
//     }

//     const newOrder = await Order.create({
//       userId,
//       items,
//       total,
//       shippingInfo,
//     });

//     // clear user cart after placing order
//     await Cart.deleteMany({ userId });

//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //   Get all orders of logged in user
// const getMyOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { placeOrder, getMyOrders };
