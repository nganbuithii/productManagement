// chứa router
const productRouter = require("./product.route")
const homeRouter = require("./home.router")




// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    app.use('/',homeRouter);
    
    
    app.use('/products', productRouter);
}