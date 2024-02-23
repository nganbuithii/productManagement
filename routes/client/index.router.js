// chứa router
const productRouter = require("./product.route")
const homeRouter = require("./home.router")

const categoryMiddlewares = require("../../middlewares/client/category.middlewares")// cài vào để luôn luôn lấy ra danh mục


// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    //- bởi vì danh mục trang nào cũng có -> tránh gọi đi, bị lặp codde -> sử dụng app.use
    app.use(categoryMiddlewares.category)

    app.use('/', homeRouter);

    app.use('/products', productRouter);
}