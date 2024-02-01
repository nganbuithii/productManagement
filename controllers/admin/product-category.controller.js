const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const ProductCategory = require("../../models/product-category.model")
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus")
const paginationHelper = require("../../helpers/pagination");
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

    // phân trang
    const countProduct = await ProductCategory.countDocuments(find);
    let objectPagination = paginationHelper(
    {
        currentPage: 1,
        limitItemms: 4,
    },
    req.query,
    countProduct
    );
    //end phân trang


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
    
    const records = await ProductCategory
        .find(find)
        .limit(objectPagination.limitItemms)
        .skip(objectPagination.skip)
        .sort(sort) // để sắp xếp các position  giảm dần 
    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records:records,//records : bản ghi
        keyword: objectSearch.keyword,
        filterStatus: filterStatus,
        pagination: objectPagination,
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

// [get]/admin/products-category/change-status/:active/:id

module.exports.changeStatus = async(req,res) =>{
    const status = req.params.status
    const id = req.params.id
    // cập nhật sản phẩm trong database - mongoose
    await ProductCategory.updateOne({_id:id},{status:status})
    // tham khảo tài liệu api -reference - response - redirect(chuyển hướng)
    res.redirect('back')
}

// [patch]/admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    // chuyển id thành mảng split
    switch (type) {
      // search tham khảo: update many in mongose
        case "active":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "active" });
            break;
        case "inactive":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            break;
        case "delete-all":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { deleted: true , deteteAt:new Date() });
        default:
            break;
    }
    res.redirect("back");
    //res.send("ok")
};


// [delete] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    // lấy ra id
    const id = req.params.id;
    //console.log(id);
    await ProductCategory.updateOne({ _id: id }, { deleted: true , deteteAt:new Date() });
    res.redirect("back");
};