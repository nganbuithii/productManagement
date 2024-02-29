
const User = require("../../models/user.model");
const Roles = require("../../models/roles.model");

module.exports.requiredAuth = async (req, res, next) => {
    
    if(!req.cookies.tokenUser){
    // check : nếu k tồn tại token => chuyển trang login
        res.redirect(`/user/login`)
        return;
    }
    else{
        // lấy ra token
        
        const user = await User.findOne({tokenUser: req.cookies.tokenUser}).select("-password")
        //console.log(user);
        // nếu không tồn tại user thì back về - nếu có thì next()
        if(!user){
            res.redirect(`/user/login`)
            return;
        }
        next();
    }

}