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

//POST /checkout/order
module.exports.order = async(req, res) => {
    const cartId = req.cookies.cartId

    const userInfo = req.body

    const cart = await Cart.findOne({
        _id: cartId
    })
    let products = []

    // lấy ra các sản phẩm trong cart
    for(const product of cart.products){
        // tạo 1obj product
        const objProduct = {
            product_id : product.product_id,
            price:0,
            discountPercentage: 0,
            quantity :product.quantity
        }
        //truy vấn sản phẩm
        const productInfo = await Product.findOne({
            _id:product.product_id
        })
        // tìm được sản phẩm rồi thì cập nhật price và discount
        objProduct.price = productInfo.price
        objProduct.discountPercentage = productInfo.discountPercentage

        products.push(objProduct)
    }
    // lưu vào database
    const objOrder = {
        cart_id:cartId,
        // 1obj thông tin người dùng
        userInfo :userInfo,
        //mảng sản phẩm
        products:products
    }
    // lưu
    const order = new Order(objOrder)
    await order.save();

    //- CẬP NHẬT LẠI GIỎ HÀNG THÀNH MẢNG RỖNG
    await Cart.updateOne({
        _id:cartId
    },{
        products:[]
    })
    
    //- chuyển hướng đến trang đặt hàng thành công
    res.redirect(`/checkout/success/${order.id}`)
}