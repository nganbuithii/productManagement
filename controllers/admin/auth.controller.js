const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const Account = require("../../models/account.model");
var md5 = require('md5');
// GET /admin/auth/login
module.exports.index = async(req, res) => {
    res.render("admin/pages/auth/login"),{
        pageTitle:" Đăng nhập"
    }
}

//Cannot POST /admin/auth/login
module.exports.loginPost = async(req, res) => {
    //console.log(req.body);
    const email = req.body.email
    const password = req.body.password

    const user = await Account.findOne({
        email:email,
        deleted:false
    })

    //nếu k tồn tại email
    if(!user){
        req.flash("error"," Email không tồn tại")
        res.redirect("back");
        return;
    }
    if(md5(password) != user.password){
        //nếu khác pass
        req.flash("error","Mật khẩu không chính xác")
        res.redirect("back");
        return;
    }

    // nếu tại khoản bị vô hiệu hóa
    if(user.status == "inactive"){
        req.flash("error","Tài khoản đã bị khóa")
        res.redirect("back");
        return;
    }
    res.cookie('token', user.token)
    res.redirect(`${prefixAdmin}/dashboard`)
}