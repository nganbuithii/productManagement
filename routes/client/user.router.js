const express = require("express");

const router = express.Router();
const validates = require("../../validates/client/user.validates")
const controller = require("../../controllers/client/user.controller");

// /user/regisster
router.get("/register", controller.register)
router.post("/register",validates.registerPost, controller.registerPost)

router.get("/login", controller.login)
router.post("/login",validates.loginPost, controller.loginPost)

router.get("/logout", controller.logout)

// export
module.exports = router;
