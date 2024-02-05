const systemConfix = require("../../config/system")
const Account = require("../../models/account.model");
const Roles = require("../../models/roles.model");
const prefixAdmin = systemConfix.prefixAdmin
var md5 = require('md5');
// GET /admin/accounts
module.exports.index = async(req, res) => {
    let find = {
        deleted:false
    }
    const records = await Account.find(find).select("-password -token")
    //select("-password -token") : để trả ra all trừ -2 trường này ngoài giao diện thôi    

    for (const record of records)
    {
        const role = await Roles.findOne({
            deleted: false,
            _id: record.role_id
        })
        
        record.role = role // add thêm 1 key mới là role, thay thế id
    }
    res.render("admin/pages/account/index.pug",{
        pageTitle:"Danh sách tài khoản",
        records:records
    })
    
}

// GET /admin/accounts/create
module.exports.create = async(req, res) => {

    let find = {
        deleted:false
    }
    const records = await Roles.find(find);
    res.render("admin/pages/account/create.pug",{
        pageTitle:"Tạo tài khoản",
        records:records
    })
    
}
//POST /admin/accounts/create
module.exports.createPost = async (req, res) => {

    const mailExist = await Account.findOne({
        email:req.body.email,
        deleted:false
    })
    
    if(mailExist){
        req.flash("error"," email đã tồn tại");
        res.redirect("back")
    }
    else{
        req.body.password = md5(req.body.password)
        const records = new Account(req.body)
        await records.save()
        res.redirect(`${prefixAdmin}/accounts`)
    }
    
    
    
}