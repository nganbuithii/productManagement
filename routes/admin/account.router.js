const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");

const multer  = require('multer')
const upload = multer()
const uploadCloud = require ("../../middlewares/admin/uploadCloud.middlewares.js")//up ảnh

//validates
const validates = require("../../validates/admin/account.validates.js")
const { validate } = require("../../models/account.model.js");
// admin/accounts
router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single('thumbnail'),uploadCloud.upload,validates.createPost,controller.createPost);



// export
module.exports = router;
