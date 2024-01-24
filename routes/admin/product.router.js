const express = require("express");

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

// export
module.exports = router;