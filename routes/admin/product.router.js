const express = require("express");

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);// lấy phương thức get để ra giao diện

router.post("/create", controller.createPost);// khi submit form tạo mới - phương thức post

// export
module.exports = router;
