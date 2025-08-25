const Wishlist = require("../models/whishlistSchema");
const Cart =require("../models/cartSchema")

const addToWhishlist =async(req,res)=>{
    try{
        const userId = req.user.id;
        const {productId} = req.body;

        console.log("req.user 👉", req.user);
        console.log("productId👉", productId);




         if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

        const existing= await Wishlist.findOne({userId,productId});
        if(existing) return res.status(400).json({message:"already  in whishlist"})

            const newItem = await Wishlist.create({userId,productId})
            res.status(201).json(newItem)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getWhishlist = async(req,res)=>{
     try{
        const userId = req.user.id;

        const whishlistItems = await Wishlist.find({userId})
        .populate("productId","name price image description")

        res.json(whishlistItems)
     }catch(err){
        res.status(500) .json({message:err.message})
     }
}

//move whishlist items to cart

const moveToCart = async(req,res)=>{
    try{
        const {productId} = req.params;
        const userId =  req.user.id;
        console.log("usr",userId)

         

        const whishlistItems = await Wishlist.findOne({ productId, userId})
        if(!whishlistItems) return res.status(404).json({message:"whishlist item  not found"})

            //checkming if product already in cart 

            const exists =  await Cart.findOne({productId , userId})
            if(!exists){
                await Cart.create({
                    userId,
                    productId,
                   
                  quantity: 1
                });

            }

            //when the above code add to cart fom whishlist  wants to delete from whishlist 
            await Wishlist.deleteOne({_id:whishlistItems.id})
        

            // then wants to updates in  the whishlist 

            const whishlistUpdated = await Wishlist.find({userId})
            .populate("productId" , "name price image description")

            res.json({message:"moved to cart", whishlist:whishlistUpdated})
    } catch(err){
            res.status(500).json({ message: err.message });

    }
}


const removeFromWishlist = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.id;

        await Wishlist.deleteOne({ userId , _id:id})

        // return updated whishlist 

        const updatedWhishlist = await Wishlist.find({userId})
        .populate("productId","name price image description")

        res.json({message:"remove from whishlist ", whishlist:updatedWhishlist})
    } catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {removeFromWishlist,getWhishlist,addToWhishlist,moveToCart}

 