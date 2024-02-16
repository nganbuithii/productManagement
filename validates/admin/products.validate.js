module.exports.createPost = (req, res, next) => {
    // Kiểm tra nếu đang thêm mới sản phẩm và tiêu đề không được cung cấp
    if (!req.params.id && !req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề");
        return res.redirect("back");
    }
    next(); // Cho phép tiếp tục xử lý nếu không phải là thêm mới hoặc tiêu đề đã được cung cấp
};
