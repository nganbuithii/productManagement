const express = require("express");
const multer  = require('multer')
const upload = multer()

const validates = require("../../validates/admin/products-category.validates.js")

const controller = require("../../controllers/admin/product-category.controller");
const { validate } = require("../../models/product.model");
const uploadCloud = require ("../../middlewares/admin/uploadCloud.middlewares.js")

const router = express.Router();
router.get("/", controller.index);

// GET /admin/products-category/create
router.get("/create", controller.create);
router.post("/create", upload.single('thumbnail'),uploadCloud.upload,validates.createPost, controller.createPost);// khi submit form tạo mới - phương thức post

// export
module.exports = router;
