const express = require("express");

const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

//Cannot POST /cart/add/65d99ad9d45eadb1c67ebd5b

router.post("/add/:productId", controller.addPost);

router.get("/", controller.index)

router.get("/delete/:productId", controller.delete)



// export
module.exports = router;
