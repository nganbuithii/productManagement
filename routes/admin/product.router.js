const express = require("express");
const multer  = require('multer')
//const storageMulter = require("../../helpers/storageMulter")
const upload = multer()

const validates = require("../../validates/admin/products.validate.js")
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const { validate } = require("../../models/product.model");

const uploadCloud = require ("../../middlewares/admin/uploadCloud.middlewares.js")

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);// lấy phương thức get để ra giao diện

router.post("/create", upload.single('thumbnail'),uploadCloud.upload,validates.createPost, controller.createPost);// khi submit form tạo mới - phương thức post


router.get("/edit/:id",controller.edit)// để lấy ra giao diện
router.patch("/edit/:id", upload.single('thumbnail'),validates.createPost, controller.editPatch);// khi submit thì cập nhật trong database

router.get("/detail/:id",controller.detail)

// export
module.exports = router;
