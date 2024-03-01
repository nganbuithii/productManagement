const User = require("../../models/user.model")
module.exports.getInfoUser = async(req, res, next) => {
    //-console.log(req.cookies.tokenUser);

    if(req.cookies.tokenUser){
        // nếu đăng nhập thành công
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted:false
        }).select("-password -tokenUser")
    
        //console.log(user);

        //- nếu có user
        if(user){
            res.locals.user = user
        }
    }
    next();
}