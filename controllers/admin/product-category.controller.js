const systemConfix = require("../../config/system")
const prefixAdmin = systemConfix.prefixAdmin
const ProductCategory = require("../../models/product-category.model")
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus")
const paginationHelper = require("../../helpers/pagination");
const createTreeHelper = require("../../helpers/createTree");
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
    const count = await ProductCategory.countDocuments(find);
    let objectPagination = paginationHelper(
    {
        currentPage: 1,
        limitItemms: 4,
    },
    req.query,count
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
      //.limit(objectPagination.limitItemms)
        //.skip(objectPagination.skip)
        //.sort(sort) // để sắp xếp các position  giảm dần 

         //create Tree
    const newRecords = createTreeHelper.tree(records)


    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records:newRecords,//records : bản ghi
        keyword: objectSearch.keyword,
        filterStatus: filterStatus,
        pagination: objectPagination,
    });
};

//GET /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted:false
    }
    // sắp xếp
    let sort = {}
    // nếu ngta có truyền url thif
    if(req.query.sortKey && req.query.sortValue)
    {
        sort[req.query.sortKey] = req.query.sortValue }
    else {
    // neeus k co thì sapxếp mặc định
    sort.position = "desc"
    }

    // lấy ra các danh mục để đổ ra giao diện " danh mục cha"
    const records = await ProductCategory.find(find)

      //create Tree
    const newRecords = createTreeHelper.tree(records)
    //console.log(newRecords);
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo danh mục",
        records:newRecords
    });
}
//POST /admin/products-category/create
module.exports.createPost = async (req, res) => {
    const permission = res.locals.role.permission
    //console.log(res.locals.role.permission);
    if(permission.includes("product-category-create")){
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
    else{
        return
        // để chặn quyền khi ai đó biết link , họ dùng post man gửi lên, lúc đó data bị rác
    }
}

// [get]/admin/products-category/change-status/:active/:id

module.exports.changeStatus = async(req,res) =>{
    const permission = res.locals.role.permission
    //console.log(res.locals.role.permission);
    if(permission.includes("product-category-edit")){
        const status = req.params.status
        const id = req.params.id
        // cập nhật sản phẩm trong database - mongoose
        await ProductCategory.updateOne({_id:id},{status:status})
        // tham khảo tài liệu api -reference - response - redirect(chuyển hướng)
        res.redirect('back')
    } else{
        return
    }
}

// [patch]/admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
    const permission = res.locals.role.permission
    //console.log(res.locals.role.permission);
    if(permission.includes("product-category-edit")){
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
    } else{
        return
    }
};


// [delete] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    // lấy ra id
    const id = req.params.id;
    //console.log(id);
    await ProductCategory.updateOne({ _id: id }, { deleted: true , deteteAt:new Date() });
    res.redirect("back");
};

//Cannot GET /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id;// lấy ra id cần edit
        let find = {
            deleted:false
        }
        const data = await ProductCategory.findOne({_id:id, deleted:false}) // lấy ra danh mục có id = id đang truyền vào, và chưa bị xóa (deleted = false)

        // lấy ra các danh mục để đổ ra giao diện " danh mục cha"
        const records = await ProductCategory.find(find)

        //create Tree
        const newRecords = createTreeHelper.tree(records)
        res.render("admin/pages/product-category/edit", {
            pageTitle: "Tạo danh mục",
            data:data,
            records: newRecords
            
        });
    }catch(error){
        res.redirect(`$(systemConfix.prefixAdmin)/products-category`)
    }
}
//Cannot PATCH /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const permission = res.locals.role.permission
    //console.log(res.locals.role.permission);
    if(permission.includes("product-category-edit")){
        // xử lí truwownhf hợp khi sửa id bậy trên url -> try catch
        try{
            const id = req.params.id;// lấy ra id cần edit
                //console.log(req.body);
                // update lại thành số
                req.body.position = parseInt(req.body.position)
                
                //update vào database
                await ProductCategory.updateOne({_id:id}, req.body)
                req.flash("info","Cập nhật thông tin thành công ")
        }catch(error)
        {
            req.flash("error","Cập nhật thông tin thất bại")
        }
        res.redirect("back")
    }else{
        return
    }
}
    