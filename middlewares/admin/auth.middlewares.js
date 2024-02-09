const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const Account = require("../../models/account.model");
const Roles = require("../../models/roles.model");

module.exports.requiredAuth = async (req, res, next) => {
    
    if(!req.cookies.token){
    // check : nếu k tồn tại token => chuyển trang login
        res.redirect(`${prefixAdmin}/auth/login`)
    }
    else{
        // lấy ra token
        
        const user = await Account.findOne({token: req.cookies.token}).select("-password")
        //console.log(user);
        // nếu không tồn tại user thì back về - nếu có thì next()
        if(!user){
            res.redirect(`${prefixAdmin}/auth/login`)
        }else{
            const role = await Roles.findOne({_id:user.role_id}).select("title permission")
            // biến user toàn cục -> trả ra frontend
            res.locals.user = user
            res.locals.role = role
            next()
        }
    }

}