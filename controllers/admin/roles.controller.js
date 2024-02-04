const systemConfix = require("../../config/system")

const Roles = require("../../models/roles.model");
const prefixAdmin = systemConfix.prefixAdmin


// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted :false
  }
  const records = await Roles.find(find);
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records:records
      });
}

//GET /admin/roles/create
module.exports.create = async (req, res) => {
  
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới quyền",
      });
}

//POST /admin/roles/create
module.exports.createPost = async (req, res) => {
  //console.log(req.body);// test thử các giá trị nhập trong in put -> đc lưu trong req.body

  // lưu xuống db
  const record = new Roles(req.body)
  await record.save()

  res.redirect(`${prefixAdmin}/roles`)
}
