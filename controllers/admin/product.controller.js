const product = require("../../models/product.model"); // import model vào

//import hàm lọc
const filterStatusHelper = require("../../helpers/filterStatus")

// [GET] /admin/products

module.exports.index = async (req, res) => {
  
  let find={
    deleted:false
  }
  // đoạn bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  // tìm kiếm theo key
  let keyword = "";
  if(req.query.keyword){
    keyword=req.query.keyword
    // search doc regex javascript
    const regex = new RegExp(keyword,"i")// timf kieems tên sp có tên đó, không phân biệt chữ hoa chữ thường
    find.title = regex
  }




  // truy vấn tìm kiếm sp theo status
  if(req.query.status){
    find.status = req.query.status
  }
  
  //console.log(req.query.status);
  const products = await product.find(find);

  //console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products :products,
    filterStatus : filterStatus,
    keyword:keyword
  });
};
