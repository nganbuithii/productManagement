const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  title: String,
  description: String,
  //nhóm quyền
  permission :{type:Array, default:[]},
  deleted: {
    type:Boolean,
    default: false
  },
  deleteAt:Date},
  {
    timestamps:true // nó sẽ update thời gian cập nhật
  },
  
);
const Roles = mongoose.model("Role", roleSchema, "roles");
//tham số thứ 3 là tên connection nha

module.exports = Roles;
