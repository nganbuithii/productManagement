
module.exports.createPost = (req, res, next) =>{
    if(!req.body.title){
        req.flash("error"," Vui lòng nhập tiêu đề");
        res.redirect("back")
        return; // ngăn chặn các dòng code phía dưới
    }
    next();// next sang bước kế tiếp
}