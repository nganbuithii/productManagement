const mongoose = require("mongoose")

/// check coi connect database thành công chưa
module.exports.connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("thành công");
    }catch(error){
        console.log("thất bại");
    }
}
