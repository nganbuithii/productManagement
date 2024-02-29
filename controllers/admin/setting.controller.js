const { json } = require("body-parser");
const systemConfix = require("../../config/system")
const SettingGeneral = require("../../models/setting-general.model")
const Roles = require("../../models/roles.model");
const prefixAdmin = systemConfix.prefixAdmin


// [GET] /admin/settings/generals
module.exports.general = async (req, res) => {
    //- vì có 1 bản ghi nên luôn luôn lấy bản ghi đầu tiên
    const record = await SettingGeneral.findOne({})

    res.render("admin/pages/setting/general", {
        pageTitle: "Cài đặt chung",
        record:record
    });
}
// [PATCH] /admin/settings/generals
module.exports.generalPatch = async (req, res) => {
    //console.log(req.body);
    const settingGeneral = await SettingGeneral.findOne({})

    //- nếu có thì cập nhật
    if(SettingGeneral){
        await SettingGeneral.updateOne({
            _id:settingGeneral.id
        }, req.body)
    }else{
        //- chưa có thì thêm mới
        const record = new SettingGeneral(req.body)
        await record.save()
    }
    
    
    req.flash("info","Cập nhật thành công")
    res.redirect("back")
}
