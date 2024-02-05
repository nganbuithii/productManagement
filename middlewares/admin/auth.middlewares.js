const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const Account = require("../../models/account.model");

module.exports.requiredAuth = async (req, res, next) => {
    
    if(!req.cookies.token){
    // check : nếu k tồn tại token => chuyển trang login
    res.redirect(`${prefixAdmin}/auth/login`)
    }
    else{
        // lấy ra token
        console.log(req.cookies.token);
        
        const user = await Account.findOne({token: req.cookies.token})
        //console.log(user);
        // nếu không tồn tại user thì back về - nếu có thì next()
        if(!user){
            res.redirect(`${prefixAdmin}/auth/login`)
        }else{
            next()
        }
    }

}