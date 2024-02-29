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

router.get("/password/forgot", controller.forgotPassword)
router.post("/password/forgot",validates.forgotPassword, controller.forgotPasswordPost)

router.get("/password/otp", controller.otpPassword)
router.post("/password/otp", controller.otpPasswordPost)

router.get("/password/reset", controller.resetPassword)
router.post("/password/reset", validates.resetPasswordPost, controller.resetPasswordPost)
// export
module.exports = router;
