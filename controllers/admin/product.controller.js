const systemConfix = require("../../config/system")
//import hàm lọc
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const product = require("../../models/product.model");
const Account = require("../../models/account.model");
const ProductCategory = require("../../models/product-category.model");
const prefixAdmin = systemConfix.prefixAdmin
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
  const countProduct = await product.countDocuments(find);
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

  
  const products = await product
    .find(find)
    .limit(objectPagination.limitItemms)
    .skip(objectPagination.skip)
    .sort(sort) // để sắp xếp các position  giảm dần 

    // truy vấn tên 
  for (const product of products){
    // lấy ra thông tin người tạo
    const user = await Account.findOne({
      _id:product.createBy.account_id
    })
    // nếu có tồn tại
    if(user){
      product.accountFullName = user.fullName
    }
    // lấy ra thông tin người cập nhật gần nhất
    //- lấy ra phần tử cuối trong mảng updateBy
    const updateBy = product.updateBy[product.updateBy.length - 1];
    // nếu có thông tin update
    if(updateBy){
      const userUpdate = await Account.findOne({
      _id:updateBy.account_id   // lấy id của user cuối cùng trong mảng
      })
      
        // cập nhật thêm thông tin cho updateBy - thêm key fullName
      updateBy.accountFullName = userUpdate.fullName
    }
    
  }
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [patch]/admin/products/change-status/:active/:id
module.exports.changeStatus = async (req, res) => {
  const permission = res.locals.role.permission

  if(permission.includes("product-edit")){
    const status = req.params.status;
    const id = req.params.id;

    // cập nhật trường update By
    const updateBy = {
      account_id:res.locals.user.id,
      updateAt:new Date()
    }
    // cập nhật sản phẩm trong database - mongoose
    await product.updateOne({ _id: id }, 
      { status: status ,
        $push:{ updateBy:updateBy}// thêm vào mảng 
      });

    // tham khảo tài liệu api -reference - response - redirect(chuyển hướng)
    req.flash("info","Đổi trạng thái thành công ")
    res.redirect("back");
  }else{
    return
  }
};

// [patch]/admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const permission = res.locals.role.permission

  if(permission.includes("product-edit")){
    const type = req.body.type;
    const ids = req.body.ids.split(",");
    // chuyển id thành mảng split
    //console.log(type);
    //console.log(ids);

    // cập nhật trường update By
    const updateBy = {
      account_id:res.locals.user.id,
      updateAt:new Date()
    }
    switch (type) {
      // search tham khảo: update many in mongose
      case "active":
        await product.updateMany({ _id: { $in: ids } }, { status: "active",$push:{ updateBy:updateBy} });
        req.flash("info",` cập nhật trạng thái ${ids.length} sản phẩm thành công`)
        break;
      case "inactive":
        await product.updateMany({ _id: { $in: ids } }, { status: "inactive",$push:{ updateBy:updateBy} });
        req.flash("info",` cập nhật trạng thái  ${ids.length}sản phẩm thành công`)
        break;
      case "delete-all":
        await product.updateMany({ _id: { $in: ids } }, { deleted: true , deteteAt:new Date() });
        req.flash("info",` Xóa  ${ids.length}sản phẩm thành công`)
        break;
      case "change-position":
        //console.log(ids);
        for(const item of ids){
          
          //tạo thành mảng
          //console.log(item.split("-"))
          //phá võ cấu trúc mảng
          let [id,position] = item.split("-")
          position = parseInt(position)// đang nhận là string nên ép kiểu về number
          //console.log(id);
          //console.log(parseInt(position));

          // vì là vòng lặp nên sd Update One
          await product.updateOne({ _id: id },{position : position, $push:{ updateBy:updateBy}});
        }
        req.flash("info",` Đã đổi vị trí của ${ids.length}sản phẩm thành công`)
        break;
      default:
        break;
    }
    res.redirect("back");
    //res.send("ok")
  }else{
    return
  }
};

// [delete] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  // lấy ra id
  const id = req.params.id;

  await product.updateOne({ _id: id }, 
    { deleted: true , 
        deteteBy:{
          account_id:res.locals.user.id,
          deletedAt: new Date()
        }
        });
  req.flash("info","Đã xóa thành công sản phẩm  ")
  res.redirect("back");
};


// [get] /admin/products/create
module.exports.create = async (req, res) => {
  
  let find = {
        deleted: false,
    };
  const category = await ProductCategory.find(find);

  //create Tree
  const newCategory= createTreeHelper.tree(category);
  //console.log(res.locals.user); //- res.locals.user : lưu user đang đăng nhập
  res.render("admin/pages/products/create", {
      pageTitle: "Thêm sản phẩm",
      category: newCategory
  });
}
    

// [patch] /admin/products/create
module.exports.createPost = async (req, res) => {
  const permission = res.locals.role.permission

  if(permission.includes("product-create")){
    // lấy ra data -  khi submit thì mình sẽ nhận data thông qua req.body
    // vì luuw trong database là kiểu số nên ta cần parseInt
    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.discount = parseInt(req.body.discount)
    req.body.description = req.body.description || ""; // Đảm bảo trường mô tả luôn có giá trị
    if(req.body.position == ""){
      // tự động tăng - đếm có bao nhiêu bản ghi
      const countProduct = await product.countDocuments()
      //console.log(countProduct);
      req.body.position = countProduct +1;
      //console.log(req.body.position);
    }
    else{
      req.body.position = parseInt(req.body.position)
    }
    // if(req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`
    // }

    // lưu người tạo sản phẩm
    req.body.createBy = {
      account_id:res.locals.user.id
    }
    // code lưu sản phẩm xuống database
    const newproduct = new product(req.body)
    await newproduct.save();
    
    res.redirect(`${prefixAdmin}/products`)
  }
  else{
    return
  }
};

// GET /admin/products/edit/:id
module.exports.edit = async(req,res) => {
  try{
    //console.log(req.params.id);
    const find = {
      deleted:false,
      _id : req.params.id,
    }

    const productEdit = await product.findOne(find)

    res.render("admin//pages/products/edit",{
      pageTitle:"Sửa sản phẩm",
      productEdit:productEdit
    })
  }catch(error){
    res.redirect(`$(systemConfix.prefixAdmin)/products`)
  }

}

// PATCH /admin/products/edit/:id
module.exports.editPatch = async(req,res) => {
  const permission = res.locals.role.permission

  if(permission.includes("product-edit")){
    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.discount = parseInt(req.body.discount)
    req.body.position = parseInt(req.body.position)

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    // update trong mongoose - updateOne
    try{
      //console.log(req.body);
      // tạo obj luuw người edit
      const updateBy = {
        account_id:res.locals.user.id,
        updateAt:new Date()
      }
      // cập nhật vào model

      await product.updateOne({_id:req.params.id }, 
        {
          ...req.body,// lấy ra phần tử cũ
          $push:{ updateBy:updateBy}// thêm vào mảng 
        });
      req.flash("info","Cập nhật thông tin thành công ")
    }
    catch(error){
      req.flash("error","Cập nhật thông tin thất bại")
    }
    res.redirect("back")
  }else{
    return
  }
}

//GET /admin/products/detail/:id
module.exports.detail = async(req,res) =>{
  try{
    //console.log(req.params.id);
    const find = {
      deleted:false,
      _id : req.params.id,
    } 

    const productF = await product.findOne(find)
    //console.log(productF);
    res.render("admin/pages/products/detail",{
      pageTitle:productF.title,
      productF:productF
    })
  }catch(error){
    res.redirect(`${prefixAdmin}/products`)
  }
}