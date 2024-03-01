// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if(formSendData){
    //-console.log(formSendData);

    //- lắng nghe sự kiện submit
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        //-console.log(content);

        if(content){
            socket.emit("CLIENT_SEND_MESSAGE", content)
            e.target.elements.content.value = ""
        }
    })
}
// END CLIENT SEND MESSAGE



// SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    //console.log(data)

    // hiển thị ra ngoài giao diện
    const body = document.querySelector(".chat .inner-body")

    const div = document.createElement("div")
    div.classList.add("inner-incoming")
    div.innerHTML = `
    <div class="inner-name"> ${data.fullName} </div>
    <div class="inner-content"> ${data.content} </div>
    `
    body.appendChild(div)
})

// END server return message