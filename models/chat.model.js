const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        user_id: String,
        room_chat_id : String,
        content:String,
        images: Array,
        deleted:{
            type:Boolean,
            default:False
        },
        deletedAt: Date
    },
    {
        timestamps:true
    },
    
);
const Chat = mongoose.model("Chat", ChatSchema, "chat");
//tham số thứ 3 là tên connection nha

module.exports = Chat;
