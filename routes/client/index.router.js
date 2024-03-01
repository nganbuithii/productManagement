// chứa router
const productRouter = require("./product.route")
const homeRouter = require("./home.router")
const searchRouter = require("./search.router")
const cartRouter = require("./cart.router")
const checkoutRouter = require("./checkout.router")
const userRouter = require("./user.router")
const chatRouter = require("./chat.router")

const categoryMiddlewares = require("../../middlewares/client/category.middlewares")// cài vào để luôn luôn lấy ra danh mục
const cartMiddlewares = require("../../middlewares/client/cart.middlewares")
const userMiddlewares = require("../../middlewares/client/user.middlewares")
const settingMiddlewares = require("../../middlewares/client/setting.middlewares")
const authMiddlewares = require("../../middlewares/client/auth.middlewares")

// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    //- bởi vì danh mục trang nào cũng có -> tránh gọi đi, bị lặp codde -> sử dụng app.use
    app.use(categoryMiddlewares.category)

    // luôn chạy qua cart middleware
    app.use(cartMiddlewares.cartId)
    app.use(userMiddlewares.getInfoUser)
    app.use(settingMiddlewares.settingGeneral)

    app.use('/', homeRouter);

    app.use('/products', productRouter);
    
    app.use('/search', searchRouter);
    
    app.use('/cart', cartRouter);

    app.use('/checkout', checkoutRouter);
    
    app.use('/user', userRouter);
    
    //- chỉ ai đăng nhập mới vào được
    app.use('/chat', authMiddlewares.requiredAuth, chatRouter);
}