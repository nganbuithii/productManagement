const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);// khai báo slug
const productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: { type: String, default:""},
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: { type: String, slug: "title", unique:true },
  deleted: {
    type:Boolean,
    default: false
  },
  deleteAt:Date},
  {
    timestamps:true
  }
);
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "product-category");
//tham số thứ 3 là tên connection nha

module.exports = ProductCategory;
