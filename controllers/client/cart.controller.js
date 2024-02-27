const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")

//Cannot POST /cart/add/:id
module.exports.addPost = async(req, res) => {
    const cartId = req.cookies.cartId;


    const productId = req.params.productId

    const quantity = parseInt(req.body.quantity)//- lấy ra số lượng trong input

    const cart = await Cart.findOne({
        _id:cartId
    })
    
    const existProductInCart = cart.products.find(item => item.product_id == productId)

    if(existProductInCart){
        //- cập nhật quantity
        console.log("cập nhật sl");
        const newQuantity =  quantity + existProductInCart.quantity;
        console.log(newQuantity);

        //- update số lượng sản phẩm nếu sản phẩm đó đã có trong giỏ hàng
        await Cart.updateOne({
            _id:cartId,
            'products.product_id': productId
        },{
            'products.$.quantity':newQuantity
        })
    }else{
        //- thì tạo mới obj
        //- tạo obj giỏ hàng
        const objCart = {
            product_id: productId,
            quantity:quantity
        }

         //- lưu vào giỏ hàng
        await Cart.updateOne({
            _id:cartId,
        },{
            //- thêm vào products vào cái obj này
            $push:{ products :objCart}
        })
    }
    

    //- chữ trắng là String, chữ màu xanh lá : Number
    //console.log(productId);
    //console.log(quantity);
    //console.log(cartId);


    req.flash("success"," Thêm sản phẩm vào giỏ hàng thành côn")
    res.redirect("back")
}

//GET /cart
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
    res.render("client/pages/cart/index",{
        pageTitle: "Trang giỏ hàng",
        cart:cart

    })

}