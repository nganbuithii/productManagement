const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const ProductCategory = require("../../models/product-category.model")
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus")
// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    // đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    // tìm kiếm
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
      // truy vấn tìm kiếm sp theo status
    if (req.query.status) {
        find.status = req.query.status;
    }
    // sắp xếp
    let sort = {}
    // nếu ngta có truyền url thif
    if(req.query.sortKey && req.query.sortValue)
    {
        sort[req.query.sortKey] = req.query.sortValue
    }
    else {
        // neeus k co thì sapxếp mặc định
        sort.position = "desc"
    }
   // end sắp xếp
    const records = await ProductCategory.find(find).sort(sort) // để sắp xếp các position  giảm dần 

    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records:records,//records : bản ghi
        keyword: objectSearch.keyword,
        filterStatus: filterStatus,
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

// [get]/admin/products/change-status/:active/:id

module.exports.changeStatus = async(req,res) =>{
    const status = req.params.status
    const id = req.params.id
    // cập nhật sản phẩm trong database - mongoose
    await ProductCategory.updateOne({_id:id},{status:status})
    // tham khảo tài liệu api -reference - response - redirect(chuyển hướng)
    res.redirect('back')
}