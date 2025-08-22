const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/ShoeVerse");
        console.log("mongo db connected succesfully");

    }catch(err){
        console.error("mongo connection failed",err.message);
        process.exit(1)// stop app if DB fails
    }
};

module.exports = connectDB;








 


