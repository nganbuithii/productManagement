const product = require("../../models/product.model"); // import model vào

// [GET] /admin/products

module.exports.index = async (req, res) => {
  // mảng xử lí nút bấm để vẽ ra giao diện bộ lọc
  let filterStatus = [
    {
      name:"Tất cả",
      status:"",
      class:""
    },
    {
      name:"Hoạt động",
      status:"active",
    },
    {
      name:"Dừng hoạt động",
      status:"inactive"
    }
  ]
  if(req.query.status){
    // tìm vị trí bản ghi
    const index = filterStatus.findIndex(item => item.status == req.query.status)
    filterStatus[index].class = "active"
    //console.log(index);
  }
  else{
    const index = filterStatus.findIndex(item => item.status == "")
    filterStatus[index].class = "active"
  }

  let find={
    deleted:false
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
    filterStatus : filterStatus
  });
};
