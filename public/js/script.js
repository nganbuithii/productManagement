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
