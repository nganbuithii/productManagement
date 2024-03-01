var socket = io();

// lắng nghe sự kiện
socket.on("SERVER_SEND_SOCKET_ID", (data) => {
  // const socketId = document.querySelector("#socket-id")
  // socketId.innerHTML = data
  // console.log('data: ' + data);
    var form = document.getElementById("form");
    var input = document.getElementById("input");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (input.value) {
        socket.emit("CLIENT_SEND_MESSAGE", input.value);
        input.value = "";
        }
    });
    });

    // lắng nghe sự kiện return sever message
    socket.on("SERVER_RETURN_MESSAGE", (data) => {
    console.log("Tin nhắn :", data);
    });
