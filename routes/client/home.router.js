const express = require("express");

const router = express.Router();

const controller = require("../../controllers/client/home.controller");

router.get("/", controller.index);

// export
module.exports = router;
