// [GET] /products


const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await product.find({
    //tìm status
    status:"active",
    deleted:"false"
  });//lấy data

  console.log(products);// in ra 

  const newProduct = products.map(item =>{
    item.priceNew =(item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    return item;
  })
  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang ds sản phẩm",
    products:newProduct,
  });
};
