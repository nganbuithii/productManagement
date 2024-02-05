const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: {type:String,default:generate.generateRandomString(20)},
  phone: String,
  avatar: String,
  role_id:String,// phân quyền cho tài khoản
  status:String,
  deleted: {
    type:Boolean,
    default: false
  },
  deleteAt:Date},
  {
    timestamps:true
  },
  
);
const Account= mongoose.model("Account", accountSchema, "account");
//tham số thứ 3 là tên connection nha

module.exports = Account;
