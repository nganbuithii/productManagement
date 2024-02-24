// [GET] /products

const product = require("../../models/product.model");
const productHelper = require("../../helpers/products")
const ProductCategory = require("../../models/product-category.model")
const productCategoryHelper = require ("../../helpers/product-category")
module.exports.index = async (req, res) => {
  const products = await product
    .find({
      //tìm status
      status: "active",
      deleted: "false",
    })
    .sort({ position: "desc" }); //lấy data

  //console.log(products); // in ra

  // tính giá tiền sau giảm
  const newProduct = productHelper.priceNewProducts(products)

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
// GET /products/:slugCategory
//- lấy sản phẩm theo danh mục header
module.exports.category  = async (req, res) =>{
  
  //-param là gửi lên trên đường dẫn
  //console.log(req.params.slugCategory);

  //- lấy ra những sp thuộc danh mục
  //- dựa vào id danh mục
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted:false
  })
  //console.log(category.id)

  const listSubCategory = await productCategoryHelper.getSubCategory(category.id)//- lấy ra các danh mục con theo danh mục cha

  const listSubCategoryID = listSubCategory.map(item => item.id)//- lấy ra danh sách id các danh mục
  console.log(listSubCategoryID);


  //- xong truy vấn sản phẩm nào có product category id trùng với list categoryID
  const productsList = await product.find({
    productCategoryId: { $in : [category.id, ...listSubCategoryID]},
    deleted:false,
  }).sort({position:"desc"})
  //console.log(products);

  

  // tính giá tiền sau giảm
  const newProduct = productHelper.priceNewProducts(productsList)

  res.render("client/pages/products/index.pug", {
    pageTitle: category.title,
    products: newProduct,
  });
}

