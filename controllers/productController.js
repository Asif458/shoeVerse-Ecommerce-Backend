// const Product = require("../models/productSchema")

// /// get all products

// const getProducts = async(req,res)=>{
//     try{
//         const products = await Product.find({});
//         res.json(products);
//     } catch(error){
//         res.status(500).json({message:"Server error"})
//     }
// };

// const getProductById = async(req,res)=>{
//     try{
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.json(product)
//     }
// }

