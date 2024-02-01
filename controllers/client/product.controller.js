// [GET] /products

const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await product
    .find({
      //tìm status
      status: "active",
      deleted: "false",
    })
    .sort({ position: "desc" }); //lấy data

  //console.log(products); // in ra

  const newProduct = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang ds sản phẩm",
    products: newProduct,
  });
};

// GET /products/:slug
module.exports.detail = async (req, res) =>{
  try{
    //tìm theo slug người dùng gửi lên
    const find = {
      deleted:false,
      slug : req.params.slug,
      status:"active",
    } 

    const productF = await product.findOne(find)
    //console.log(productF);
    res.render("client/pages/products/detail",{
      pageTitle:productF.title,
      productF:productF
    })
  }
  catch(error){
    res.redirect(`/products`)
  }


}