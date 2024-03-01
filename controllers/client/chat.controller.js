const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")
const { Socket } = require("socket.io")


//GET /cart
module.exports.index = async(req, res) => {
    // SocketIo
    //- lắng nghe sự kiện connect
    _io.on('connection', (socket) => {
        console.log('a user connected');
    });
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",

    })

}