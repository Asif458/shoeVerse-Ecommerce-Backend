const mongoose  =  require('mongoose');

const whishlistSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, // which user owns this wishlist item

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }                         //which product is in the wishlist

},{timestamps:true});

module.exports = mongoose.model("Wishlist",whishlistSchema)