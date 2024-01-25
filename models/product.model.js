const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
  deleteAt:Date,
});
const product = mongoose.model("Product", productSchema, "product");
//tham số thứ 3 là tên connection nha

module.exports = product;
