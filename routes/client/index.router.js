// chứa router
const productRouter = require("./product.route")
const homeRouter = require("./home.router")
const searchRouter = require("./search.router")
const cartRouter = require("./cart.router")

const categoryMiddlewares = require("../../middlewares/client/category.middlewares")// cài vào để luôn luôn lấy ra danh mục
const cartMiddlewares = require("../../middlewares/client/cart.middlewares")

// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    //- bởi vì danh mục trang nào cũng có -> tránh gọi đi, bị lặp codde -> sử dụng app.use
    app.use(categoryMiddlewares.category)

    // luôn chạy qua cart middleware
    app.use(cartMiddlewares.cartId)

    app.use('/', homeRouter);

    app.use('/products', productRouter);
    
    app.use('/search', searchRouter);
    
    app.use('/cart', cartRouter);
}