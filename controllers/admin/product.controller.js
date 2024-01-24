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
  
// phân trang
let objectPagination = {
  currentPage:1,
  limitItemms:4
}

if (req.query.page){
  //nếu ng dùng truyền page
  objectPagination.currentPage = parseInt(req.query.page);
  
}

objectPagination.skip = (objectPagination.currentPage - 1 ) * objectPagination.limitItemms;
//console.log(objectPagination.currentPage);
const countProduct = await product.countDocuments(find);
const totalPage = Math.ceil(countProduct / objectPagination.limitItemms);

// add thêm key vào objPagination
objectPagination.totalPage = totalPage

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
