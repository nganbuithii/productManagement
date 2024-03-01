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