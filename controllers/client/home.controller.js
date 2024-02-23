
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")
// [GET] /
//- Trang chủ client
module.exports.index = async(req, res) => {
    let find={
        deleted:false,
        featured:"1",
        status:"active"
    }
    // lấy ra sản phẩm nổi bật
    const productFeatured = await Product.find(find).limit(10)
    //console.log(productFeatured);

    // tính giá tiền sau giảm
    const newProduct =productHelper.priceNewProducts(productFeatured)
    
    res.render("client/pages/home/index.pug",{
        pageTitle:"Trang chủ",
        productFeatured:newProduct
    })
}