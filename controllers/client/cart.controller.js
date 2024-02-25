const Cart = require("../../models/cart.model")

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