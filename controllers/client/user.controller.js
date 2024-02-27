const Cart = require("../../models/cart.model")
const Order = require("../../models/order.model")
const Product = require("../../models/product.model")
const User= require("../../models/user.model")
const productHelper = require("../../helpers/products")
const md5 = require("md5")
//GET /user/regisster
module.exports.register = async(req, res) => {


    res.render("client/pages/user/register",{
        pageTitle:"Đăng kí tài khoản",
    })

}
//POST /user/register
module.exports.registerPost = async(req, res) => {


    //- kiểm tra email tồn tại
    const existEmail =await User.findOne({
        email: req.body.email,
        deleted:false
    })

    //- nếu có tồn tại => in thông báo
    if(existEmail){
        req.flash("error"," Email đã tồn tại!")
        res.redirect("back")
        return;
    }
    else{
        //- mã hóa mật khẩu trước khi lưu vào
        req.body.password = md5(req.body.password)
        const user = new User(req.body)
        await user.save()
        //-console.log(user);

        //- lưu TOKEN USER -- coi như đăng nhập thành công
        res.cookie("tokenUser", user.tokenUser)
        res.redirect("/")
    }
}

