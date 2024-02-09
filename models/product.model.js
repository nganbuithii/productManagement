const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  productCategoryId : { type:String, default:""},
  createBy:{// lưu người tạo
    account_id: String,
    createAt:{
      type:Date,
      default: Date.now
    }
  },
  slug: { type: String, slug: "title", unique:true },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteBy:{ // lưu người tạo
    account_id: String,
    deleteAt:Date
  },
}, { timestamps: true });

const product = mongoose.model("Product", productSchema, "product");
//tham số thứ 3 là tên connection nha

module.exports = product;
