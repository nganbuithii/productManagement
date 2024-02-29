const Cart = require("../../models/cart.model")
const Order = require("../../models/order.model")
const Product = require("../../models/product.model")
const User= require("../../models/user.model")
const ForgotPassword= require("../../models/forgot-password.model")
const productHelper = require("../../helpers/products")
const generateHelper = require("../../helpers/generate")
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
//GET /user/logout
module.exports.logout = async (req, res) => {
    //- xóa token user trong cookie
    res.clearCookie("tokenUser")
    res.redirect("/user/login")
};
// GET /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password",{
        pageTitle:"Lấy lại mật khẩu",
    })
};
//POST /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    //-console.log(req.body.email);
    //-res.send("ok")

    //- check email trong database
    const user = await User.findOne({
        email:req.body.email,
        deleted:false
    })

    //- nếu kh có user có email đó
    if(!user){
        req.flash("error"," email không tồn tại")
        res.redirect("back");
        return;
    }

    //- việc 1: Tạo mã otp và lưu OTP , EMAIL yêu cầu vào collections forgot-password
    //- random otp //- 8 ở đây là độ dài chuỗi
    const otp = generateHelper.generateRandomNumber(8)

    const objForgotPassword = {
        email:req.body.email,
        otp:otp,
        expireAt:Date.now()
        //- nó sẽ + thêm 11s
    }
    
    //- lưu xuống db
    const forgotPassword = new ForgotPassword(objForgotPassword)
    await forgotPassword.save()

    //- việc 2: Gửi mã OTP qua email của họ
    res.redirect(`/user/password/otp?email=${req.body.email}`)
};
// GET /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email
    res.render("client/pages/user/otp-password",{
        pageTitle:"Nhập mã otp",
        email:email
    })
};
// POST /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    //-console.log(req.body);
    const email = req.body.email
    const otp = req.body.otp

    const result = await ForgotPassword.findOne({
        otp:otp,
        email:email
    })

    if(!result){
        req.flash("error","OTP không hợp lệ")
        res.redirect("back")
        return;
    }
    
    const user = await User.findOne({
        email:email
    })
    //- chuyển trang để set pass mới
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/user/password/reset")
};