const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        //use_id:String,
        cart_id: String,
        // 1obj thông tin người dùng
        userInfo :{
            fullName:String,
            phone:String,
            address: String
        },
        //mảng sản phẩm
        products:[
            {
                product_id:String,
                quantity: Number,
                price: Number,
                discountPercentage:Number
            }
        ]
    },
    {
        timestamps:true
    },
    
);
const Order = mongoose.model("Order", orderSchema, "orders");
//tham số thứ 3 là tên connection nha

module.exports = Order;
