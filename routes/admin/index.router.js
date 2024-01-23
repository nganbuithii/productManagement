// chứa router
const dashboardRouter = require("./dashboard.router")

const systemConfig = require("../../config/system")


// để sử dụng đc thì sd module.export
module.exports = (app) =>{
    const PATH_ADMIN= systemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard',dashboardRouter);
    

}