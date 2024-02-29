const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    // set thời gian hết hạn
    expireAt:{
        type:Date,
        expires:180
    }
    },
    {
        timestamps:true
    },
    
);
const ForgotPassword= mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");
//tham số thứ 3 là tên connection nha

module.exports = ForgotPassword;
