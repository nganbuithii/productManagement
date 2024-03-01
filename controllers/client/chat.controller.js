const Chat = require("../../models//chat.model")
const { Socket } = require("socket.io")

const User = require("../../models/user.model")
//GET /cart
module.exports.index = async(req, res) => {
    const userId = res.locals.user.id
    // SocketIo
    //- lắng nghe sự kiện connect
    _io.on('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async(content) => {
            //console.log(userId);
            //console.log(content);

            // lưu vào database
            const chat =new Chat({
                user_id: userId,
                content:content
            })
            await chat.save()
        })
    });

    //Lấy ra tin nhắn chat
    const chats = await Chat.find({
        deleted:false,
    })
    //console.log(chats);

    // sau khi tìm thì sẽ đổ ra danh sách chats thì t chỉ lấy vài tin cho đỡ nặng
    for(const chat of chats){
        const infoUser = await User.findOne({
            _id:userId
        }).select("fullName")

        chat.infoUser = infoUser
    }
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",
        chats:chats

    })

}