const product = require("../../models/product.model"); // import model vào

// [GET] /admin/products

module.exports.index = async (req, res) => {
  const products = await product.find({
    deleted:false
  });

  console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products :products
  });
};
