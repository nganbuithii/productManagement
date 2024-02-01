// xử lí logic trang sp

//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status")
// nếu có tồn tại
if(buttonChangeStatus.length > 0)
{
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    console.log(path);
    buttonChangeStatus.forEach(button=>{
        // bắt sựu kiện clcik
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ?"inactive": "active";
            //console.log(statusCurrent);
            //console.log(statusChange);

            const action = path + `/${statusChange}/${id}?_method=PATCH`
            //console.log(action);
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}