const product = require("../../models/product.model");

module.exports.index = (req, res) => {
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
  });
};
