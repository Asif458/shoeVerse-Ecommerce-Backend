 
const Product = require('../models//productSchema')
/// get all products
 

const getProducts = async(req,res)=>{
    try{

        const {category} = req.query;
        let filter = {};

        if(category && category!=="all"){
            filter.category=category;//filter byy category
        }

        const products = await Product.find(filter);
        console.log("productss",products)
        res.json(products)

    
    }catch(error){
        res.status(500).json({messgae:"Server error"})
    }
    
};

//get single product;

const getProductById = async(req,res)=>{
    try{
        const product  =await Product.findById(req.params.id)
    if(!product) return res.status(404).json({message:"products not found"});
    res.json(product)
    }catch(error){
        res.status(500).json({message:"server error"})
    }
    
}

module.exports = {getProducts,getProductById};

