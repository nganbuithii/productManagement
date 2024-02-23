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