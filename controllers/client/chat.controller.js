const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")


//GET /cart
module.exports.index = async(req, res) => {
    
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",

    })

}