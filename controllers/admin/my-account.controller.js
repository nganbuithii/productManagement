const systemConfix = require("../../config/system")
const Account = require("../../models/account.model");
const Roles = require("../../models/roles.model");
const prefixAdmin = systemConfix.prefixAdmin
var md5 = require('md5');

// [GET] /admin/my-account
module.exports.index = (req, res) => {
    // không hề trả ra thông tin giao diện
    //- Nhưng khi đăng nhập thì có biến user 
    //- role cũng là biến toàn cục
    res.render("admin/pages/my-account/index",{
        pageTitle:"Trang thông tin cá nhân"
    })
    
}

//GET /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit",{
        pageTitle:"Trang chỉnh sửa thông tin cá nhân"
    })
    
}

//Patch /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id

    const mailExist = await Account.findOne({
        //tìm tất cả bản ghi , nhưng trừ bản ghi đang chỉnh sửa
        // lấy ra id khác cái id edit
        _id:{$ne :id},
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
        await Account.updateOne({_id:id }, req.body);
        req.flash("info","Cập nhật thông tin thành công ")
    }
    res.redirect("back")
}