const product = require("../../models/product.model"); // import model vào

//import hàm lọc
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  // đoạn bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  // tìm kiếm
  const objectSearch = searchHelper(req.query)
  if(objectSearch.regex){
    find.title = objectSearch.regex
  }
  
// phân trang
const countProduct = await product.countDocuments(find);
let objectPagination = paginationHelper(
  {
  currentPage:1,
  limitItemms:4
  },
  req.query, countProduct
  )


//end phân trang

    // truy vấn tìm kiếm sp theo status
  if(req.query.status){
    find.status = req.query.status
  }
  // truy vấn tìm kiếm sp theo status
  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await product.find(find).limit(objectPagination.limitItemms).skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword:objectSearch.keyword,
    pagination : objectPagination
  });
};


// [get]/admin/products/change-status/:active/:id
module.exports.changeStatus = async(req,res) =>{
  const status = req.params.status
  const id = req.params.id
  // cập nhật sản phẩm trong database - mongoose
  await product.updateOne({_id:id},{status:status})

  // tham khảo tài liệu api -reference - response - redirect(chuyển hướng)
  res.redirect('back')
  

}