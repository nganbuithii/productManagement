// chứa router
const dashboardRouter = require("./dashboard.router")
const productRouter = require("./product.router")
const productCategoryRouter = require("./product-category.router")
const rolesRouter = require("./roles.router")
const accountRouter = require("./account.router")
const authRouter = require("./auth.router")
const myAccountRouter = require("./my-account.router")
const settingRouter = require("./setting.roter")
const systemConfig = require("../../config/system")

const authMiddlewares = require("../../middlewares/admin/auth.middlewares")

// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    const PATH_ADMIN= systemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard', authMiddlewares.requiredAuth,dashboardRouter);
    
    app.use(PATH_ADMIN+'/products',authMiddlewares.requiredAuth,productRouter);

    app.use(PATH_ADMIN+'/products-category',authMiddlewares.requiredAuth,productCategoryRouter);

    app.use(PATH_ADMIN+'/roles',authMiddlewares.requiredAuth,rolesRouter);

    app.use(PATH_ADMIN+'/accounts',authMiddlewares.requiredAuth, accountRouter);
    
    app.use(PATH_ADMIN+'/auth',authRouter);
    
    app.use(PATH_ADMIN+'/my-account', authMiddlewares.requiredAuth, myAccountRouter);

    app.use(PATH_ADMIN+'/settings',authMiddlewares.requiredAuth, settingRouter);
}