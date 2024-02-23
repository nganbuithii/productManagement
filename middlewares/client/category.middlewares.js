const ProductCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree");

module.exports.category= async (req, res, next) =>{
    //console.log(" Luoon chạy qua đây");
    
    let find = {
        deleted: false,
    };
    const productCategory    = await ProductCategory.find(find)
    const newProductCategory = createTreeHelper.tree(productCategory)

    // trả ra biến toàn cục danh mục
    res.locals.layoutProductCategory = newProductCategory

    next()
}