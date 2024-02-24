
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
    
    //- lấy ra sản phẩm mới nhất, sắp xếp vị trí giảm dần
    const productNew = await Product.find({
        deleted:false,
        status:"active",
    }).sort({position: "desc"}).limit(6)
    const newProductNews = productHelper.priceNewProducts(productNew)
    res.render("client/pages/home/index.pug",{
        pageTitle:"Trang chủ",
        productFeatured:newProduct,
        productsNew : newProductNews
    })
}