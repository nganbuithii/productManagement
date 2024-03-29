const Cart = require("../../models/cart.model")

module.exports.cartId = async(req, res, next) => {
    //console.log(req.cookies.cartId);

    /// nếu trong cookie chưa có cartid thì tạo giỏ hàng mới
    if(!req.cookies.cartId){
        // tạo giỏ hàng trống
        const cart = new Cart();
        await cart.save(); //- lưu xuống db
        //console.log(cart);

        //- thời gian hết hạn
        const expiresTime = 1000 * 60 * 60 * 24 * 365
        res.cookie("cartId", cart.id,
        { expires: new Date(Date.now() + expiresTime) }) //- lưu vào cookie biến  cart id và gán giá trị cart.id
        //- nếu k set thời gian sống cho biến này thì nó sẽ lưu theo phiên(khi tắt máy tính)

    }else{
        //- khi đã có giỏ hàng
        
        //- truy vấn ra giỏ hàng
        const cart = await Cart.findOne({
            _id:req.cookies.cartId
        })

        //console.log(cart);

        //- lấy ra tổng số lượng sản phẩm trong 
        //- thêm biến total
        cart.totalQuantity = cart.products.reduce((sum,item) => sum + item.quantity, 0)
    
        res.locals.miniCart = cart
    }
    next();
}