const Cart = require("../../models/cart.model")
const Order = require("../../models/order.model")
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")

//GET /checkout
module.exports.index = async(req, res) => {
    const cartId = req.cookies.cartId

    const cart = await Cart.findOne({
        _id:cartId
    })

    if(cart.products.length > 0){
        //- lấy thông tin sản phẩm trong giỏ hàng theo id
        for(const item of cart.products){
            const productId  = item.product_id

            const productInfo = await Product.findOne({
                _id: productId
            })

            //thêm key mới cho obj -- lấy ra giá mới
            productInfo.priceNew = productHelper.priceNewProduct(productInfo)
            item.productInfo = productInfo

            //- Tình tổng thành tiền
            item.totalPrice = item.quantity * productInfo.priceNew
        }
    }

    // tổng tiền tất cả sp trong giỏ hàng
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

    res.render("client/pages/checkout/index",{
        pageTitle:"Đặt hàng",
        cart:cart
    })

}
