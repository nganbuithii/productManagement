// xử lí alert thông báo
const showAlert = document.querySelector("[show-alert]")
//console.log(showAlert);
if(showAlert){
    const time =parseInt(showAlert.getAttribute("data-time"));
    //lấy ra nút close alert
    const closeAlert = showAlert.querySelector("[close-alert]")

    setTimeout( ()  =>{
        showAlert.classList.add("alert-hidden")
    },time)

    // bắt sự kiện click close
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}


// viết sự kiển trờ về cho nut go back
const buttonGoBack = document.querySelectorAll("[button-go-back]")
// trả về mảng
if(buttonGoBack.length > 0){
    buttonGoBack.forEach(button => {
        button.addEventListener("click",() => {
            history.back();
        })
    })
}