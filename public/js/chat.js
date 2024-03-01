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
    const myId = document.querySelector("[my-id]").getAttribute("my-id")

    const div = document.createElement("div")

    let htmlFullName = ""

    if(myId == data.userid){
        div.classList.add("inner-outgoing")
    }else{
        div.classList.add("inner-incoming")
        htmlFullName =  ` <div class="inner-name"> ${data.fullName} </div>`
    }
    
    div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content"> ${data.content} </div>
    `
    body.appendChild(div)
})

// END server return message