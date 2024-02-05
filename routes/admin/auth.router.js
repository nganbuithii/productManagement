const express = require("express");

const router = express.Router();

const controller = require("../../controllers/admin/auth.controller");

const validates = require("../../validates/admin/auth.validates")

//login
router.get("/login", controller.index);
router.post("/login",validates.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

// export
module.exports = router;
