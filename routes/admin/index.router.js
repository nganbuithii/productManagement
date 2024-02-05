// chứa router
const dashboardRouter = require("./dashboard.router")
const productRouter = require("./product.router")
const productCategoryRouter = require("./product-category.router")
const rolesRouter = require("./roles.router")
const accountRouter = require("./account.router")
const systemConfig = require("../../config/system")


// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    const PATH_ADMIN= systemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard',dashboardRouter);
    
    app.use(PATH_ADMIN+'/products',productRouter);

    app.use(PATH_ADMIN+'/products-category',productCategoryRouter);

    app.use(PATH_ADMIN+'/roles',rolesRouter);

    app.use(PATH_ADMIN+'/accounts',accountRouter);
}