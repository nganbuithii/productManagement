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

//CGET /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try{
        //console.log(req.params.id);
        const find = {
            deleted:false,
            _id : req.params.id,
        }
    
        const records = await Account.findOne(find).select("-password -token")
        //console.log(productEdit);
        const roles = await Roles.find({
            deleted: false,
        })
        
        res.render("admin/pages/account/edit",{
            pageTitle:"Chỉnh Sửa account",
            records:records,
            roles:roles 
            })
    }catch(error){
        res.redirect(`${prefixAdmin}/accounts`)
    }
}

// PATCH /admin/accounts/edit/id
module.exports.editPatch = async (req, res) => {
    //- khi dubmit for thì thông tin lưu trong : req.body
    try{
        const mailExist = await Account.findOne({
            //tìm tất cả bản ghi , nhưng trừ bản ghi đang chỉnh sửa
            // lấy ra id khác cái id edit
            _id:{$ne :req.params.id},
            email:req.body.email,
            deleted:false
        })
        if(mailExist){
            req.flash("error",` email ${req.body.email} đã tồn tại`);
        }else{
            // nếu nhập pass mới
            if(req.body.password) {
                req.body.password = md5(req.body.password)
            }
            else{
                // nếu k nhập thì phải xóa đi vì nó đang chứa string rỗng
                delete req.body.password
            }
            await Account.updateOne({_id:req.params.id }, req.body);
            req.flash("info","Cập nhật thông tin thành công ")
        }
        
        
    }
    catch(error){
        req.flash("error","Cập nhật thông tin thất bại")
    }
    res.redirect("back")
    
}