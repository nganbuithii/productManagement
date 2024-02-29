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

//GET /user/login
module.exports.login = async(req, res) => {
    res.render("client/pages/user/login",{
        pageTitle:"Đăng nhập",
    })

}
//POST /user/login
module.exports.loginPost = async (req, res) => {
    //console.log(req.body);
    //res.send("ok")

    const email = req.body.email;
    const password = req.body.password;

    //- kiểm tra tồn tại user có email đó k
    const user = await User.findOne({
        email: email,
        deleted: false
    });

    //- nếu không tồn tại user
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    //- check mật khẩu
    if (md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return;
    }

    //- check trạng thái nếu inactive
    if (user.status === "inactive") {
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect("back");
        return;
    }

    //- ĐĂNG NHẬP THÀNH CÔNG THÌ LƯU TOKEN USER VÀO COOKIE
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
};
