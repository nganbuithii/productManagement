const express = require("express")
const multer  = require('multer')
const upload = multer()
const uploadCloud = require ("../../middlewares/admin/uploadCloud.middlewares.js")
const router = express.Router();
const controller = require("../../controllers/admin/setting.controller");


// /admin/settings
router.get("/general", controller.general);
router.patch("/general",  upload.single('logo'),uploadCloud.upload,controller.generalPatch);
//- upload ảnh nên cần multer


// export
module.exports = router;
