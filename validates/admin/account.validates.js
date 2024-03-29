
module.exports.createPost = (req, res, next) =>{
    if(!req.body.fullName){
        req.flash("error"," Vui lòng nhập họ tên");
        res.redirect("back")
        return; // ngăn chặn các dòng code phía dưới
    }
    if(!req.body.password){
        req.flash("error"," Vui lòng nhập mật khẩu");
        res.redirect("back")
        return; // ngăn chặn các dòng code phía dưới
    }
    if(!req.body.email){
        req.flash("error"," Vui lòng nhập email");
        res.redirect("back")
        return; // ngăn chặn các dòng code phía dưới
    }
    next();// next sang bước kế tiếp
}

module.exports.editPatch = (req, res, next) =>{
    if(!req.body.fullName){
        req.flash("error"," Vui lòng nhập họ tên");
        res.redirect("back")
        return; // ngăn chặn các dòng code phía dưới
    }
    if(!req.body.email){
        req.flash("error"," Vui lòng nhập email");
        res.redirect("back")
        return; // ngăn chặn các dòng code phía dưới
    }
    next();// next sang bước kế tiếp
}