module.exports.registerPost = (req, res, next) => {
    // Kiểm tra nếu đang thêm mới sản phẩm và tiêu đề không được cung cấp
    if (!req.body.fullName ) {
        req.flash("error", "Vui lòng nhập họ và tên");
        return res.redirect("back");
    }
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập số điện thoại");
        return res.redirect("back");
    }
    if (!req.body.password ) {
        req.flash("error", "Vui lòng nhập mật khẩu");
        return res.redirect("back");
    }
    next(); // Cho phép tiếp tục xử lý nếu không phải là thêm mới hoặc tiêu đề đã được cung cấp
};
module.exports.loginPost = (req, res, next) => {
    // Kiểm tra nếu đang thêm mới sản phẩm và tiêu đề không được cung cấp
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        return res.redirect("back");
    }
    if (!req.body.password ) {
        req.flash("error", "Vui lòng nhập mật khẩu");
        return res.redirect("back");
    }
    next(); // Cho phép tiếp tục xử lý nếu không phải là thêm mới hoặc tiêu đề đã được cung cấp
};
module.exports.forgotPassword = (req, res, next) => {
    // Kiểm tra nếu đang thêm mới sản phẩm và tiêu đề không được cung cấp
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        return res.redirect("back");
    }
    next(); // Cho phép tiếp tục xử lý nếu không phải là thêm mới hoặc tiêu đề đã được cung cấp
};

module.exports.resetPasswordPost = (req, res, next) => {
    if(!req.body.password)
    {
        req.flash("error","Mật khẩu không được để trống")
        res.redirect("back")
        return;
    }
    if(!req.body.confirmPassword)
    {
        req.flash("error","Vui long xác nhận mật khẩu")
        res.redirect("back")
        return;
    }
    if(req.body.confirmPassword != req.body.password)
    {
        req.flash("error","Mật khẩu không trùng khớp")
        res.redirect("back")
        return;
    }
    next(); // Cho phép tiếp tục xử lý nếu không phải là thêm mới hoặc tiêu đề đã được cung cấp
};
