const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const settingGeneralSchema = new mongoose.Schema({
    websiteName:String,
    logo:String,
    email:String,
    address:String,
    phone:String,
    copyright:String},
    {
        timestamps:true
    },
    
);
const SettingGeneral= mongoose.model("SettingGeneral", settingGeneralSchema, "setting-general");
//tham số thứ 3 là tên connection nha

module.exports = SettingGeneral;
