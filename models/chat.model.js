const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        user_id: String,
        room_chat_id : String,
        content:String,
        images: Array,
        deleted:{
            type:Boolean,
            default:false
        },
        deletedAt: Date
    },
    {
        timestamps:true
    },
    
);
const Chat = mongoose.model("Chat", chatSchema, "chat");
//tham số thứ 3 là tên connection nha

module.exports = Chat;
