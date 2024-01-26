const product = require("../../models/product.model"); // import model vào

//import hàm lọc
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  // đoạn bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  // tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // phân trang
  const countProduct = await product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItemms: 4,
    },
    req.query,
    countProduct
  );

  //end phân trang

  // truy vấn tìm kiếm sp theo status
  if (req.query.status) {
    find.status = req.query.status;
  }
  // truy vấn tìm kiếm sp theo status
  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await product
    .find(find)
    .sort({position : "desc"})
    .limit(objectPagination.limitItemms)
    .skip(objectPagination.skip);
// .sort({position : "desc"}) // để sắp xếp các position  giảm dần 
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [patch]/admin/products/change-status/:active/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  // cập nhật sản phẩm trong database - mongoose
  await product.updateOne({ _id: id }, { status: status });

  // tham khảo tài liệu api -reference - response - redirect(chuyển hướng)
  req.flash("info","Đổi trạng thái thành công ")
  res.redirect("back");
};

// [patch]/admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  // chuyển id thành mảng split
  //console.log(type);
  //console.log(ids);
  switch (type) {
    // search tham khảo: update many in mongose
    case "active":
      await product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("info",` cập nhật trạng thái ${ids.length} sản phẩm thành công`)
      break;
    case "inactive":
      await product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("info",` cập nhật trạng thái  ${ids.length}sản phẩm thành công`)
      break;
    case "delete-all":
      await product.updateMany({ _id: { $in: ids } }, { deleted: true , deteteAt:new Date() });
      break;
    case "change-position":
      console.log(ids);
      for(const item of ids){
        
        //tạo thành mảng
        console.log(item.split("-"))
        //phá võ cấu trúc mảng
        let [id,position] = item.split("-")
        position = parseInt(position)// đang nhận là string nên ép kiểu về number
        //console.log(id);
        //console.log(parseInt(position));

        // vì là vòng lặp nên sd Update One
        await product.updateOne({ _id: id },{position : position});
      }
      break;
    default:
      break;
  }
  res.redirect("back");
  //res.send("ok")
};

// [delete] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  // lấy ra id
  const id = req.params.id;

  await product.updateOne({ _id: id }, { deleted: true , deteteAt:new Date() });

  res.redirect("back");
};
