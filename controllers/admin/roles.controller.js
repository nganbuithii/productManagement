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

//GET /admin/roles/edit/id
module.exports.edit = async (req, res) => {
  try{
    const find = {
      deleted:false,
      _id : req.params.id,
    }

    const records = await Roles.findOne(find)// truy vấn database

    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa quyền",
      records:records
    });
  }catch(error)
  {
    res.redirect(`${prefixAdmin}/roles`)
  }
}

//PATCH /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  // xử lí truwownhf hợp khi sửa id bậy trên url -> try catch
  try{
    const id = req.params.id;// lấy ra id cần edit
        //console.log(req.body);

        //update vào database
        await Roles.updateOne({_id:id}, req.body)
        req.flash("info","Cập nhật thông tin thành công ")
  }catch(error)
  {
    req.flash("error","Cập nhật thông tin thất bại")
  }
  res.redirect("back")
}