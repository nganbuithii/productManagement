import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
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

    if(myId == data.userId){
        div.classList.add("inner-outgoing")
    }else{
        div.classList.add("inner-incoming")
        htmlFullName =  ` <div class="inner-name"> ${data.fullName} </div>`
    }
    
    div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content"> ${data.content} </div>
    `
    body.appendChild(div);
    body.scrollTop = bodyChat.scrollHeight;

})

// END server return message


// Thanh scroll Chat xuống cuối cùng
const bodyChat = document.querySelector(".chat .inner-body")
if(bodyChat){
    // cách bên trên bao nhiêu
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end dcroll


//emoij picker
//document.querySelector('emoji-picker')
  //  .addEventListener('emoji-click', event => console.log(event.detail));
const emoijPicker = document.querySelector("emoji-picker")
if(emoijPicker){
    emoijPicker.addEventListener("emoji-click" , (e) => {
        const icon = e.detail.unicode
        //-console.log(icon);

        // insert icon vào ô input
        const inputChat = document.querySelector(".chat .inner-form input[name='content']")
        inputChat.value =inputChat.value + icon
    })
}

// ẨN BẢNG ICON
const buttonIcon = document.querySelector(".button-icon")
if(buttonIcon){
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
//end emoij