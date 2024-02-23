const express = require("express");
const multer  = require('multer')
//const storageMulter = require("../../helpers/storageMulter")
const upload = multer()

const validates = require("../../validates/admin/account.validates.js")
const router = express.Router();
const controller = require("../../controllers/admin/my-account.controller.js");
const { validate } = require("../../models/account.model.js");

const uploadCloud = require ("../../middlewares/admin/uploadCloud.middlewares.js")

router.get("/", controller.index);



module.exports = router;