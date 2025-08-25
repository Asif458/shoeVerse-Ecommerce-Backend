const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db connected succesfully");

    }catch(err){
        console.error("mongo connection failed",err.message);
        process.exit(1) 
    }
};

module.exports = connectDB;








 


