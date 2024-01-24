const product = require("../../models/product.model"); // import model vào

//import hàm lọc
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search")
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
  
    // truy vấn tìm kiếm sp theo status
  if(req.query.status){
    find.status = req.query.status
  }
  // truy vấn tìm kiếm sp theo status
  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword:objectSearch.keyword,
  });
};
