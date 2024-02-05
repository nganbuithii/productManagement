const express = require("express");
const multer  = require('multer')
//const storageMulter = require("../../helpers/storageMulter")
const upload = multer()

const validates = require("../../validates/admin/account.validates.js")
const router = express.Router();
const controller = require("../../controllers/admin/account.controller.js");
const { validate } = require("../../models/account.model.js");

const uploadCloud = require ("../../middlewares/admin/uploadCloud.middlewares.js")

// admin/accounts
router.get("/", controller.index);

router.get("/create", controller.create);


router.post("/create", upload.single('avatar'),uploadCloud.upload,validates.createPost, controller.createPost);// khi submit form tạo mới - phương thức post

// export
module.exports = router;
