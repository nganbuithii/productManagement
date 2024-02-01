const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const ProductCategory = require("../../models/product-category.model")
// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };

    const records = await ProductCategory.find(find)

    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records:records,//records : bản ghi
    });
};

//GET /admin/products-category/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo danh mục",
    });
}
//POST /admin/products-category/create
module.exports.createPost = async (req, res) => {
    // vị trí tự động tăng
    if(req.body.position == ""){
        const count= await ProductCategory.countDocuments()
        req.body.position = count+1;
    }
    else{
        req.body.position = parseInt(req.body.position)
    }
    // lưu xuống db
    const category = new ProductCategory(req.body)
    await category.save();

    res.redirect(`${prefixAdmin}/products-category`)
}