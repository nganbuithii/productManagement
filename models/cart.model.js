const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        //mảng sản phẩm, lưu id và số lượng
        products : [
            {
                product_id: String,
                quantity: Number
            }
        ]
    },
    {
        timestamps:true
    },
    
);
const Cart = mongoose.model("Cart", cartSchema, "cart");
//tham số thứ 3 là tên connection nha

module.exports = Cart;
