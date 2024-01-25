// xử lí logic trang sp

//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status")
// nếu có tồn tại
if(buttonChangeStatus.length > 0)
{
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    //console.log(path);
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

/* check box -  xử lí tick all*/
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    //console.log(inputCheckAll);

    const inputsID = checkboxMulti.querySelectorAll("input[name='id']")
    //console.log(inputsID);
    // bắt sự kiện cho check all
    inputCheckAll.addEventListener("click",()=>{
        //console.log(inputCheckAll.checked);
        if(inputCheckAll.checked){
            //lặp qua input con
            inputsID.forEach(input => {
                input.checked = true;
            })
        }
        else{
            inputsID.forEach(input => {
                input.checked = false;
            })
        }
    })

    // khi rich hết input thì tick all, nếu bỏ 1 cái -> tắt tickall
    inputsID.forEach(input => {
        input.addEventListener("click",()=>{
            //đếm những ô mình đã check
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            //console.log(countChecked);

            const Max = inputsID.length;
            if(countChecked == Max)
            {
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        })
    })
}

// form thay đổi nhiều trạng thái - form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    //console.log(formChangeMulti);
    // bắt sự kiện submit
    formChangeMulti.addEventListener("submit",(e)=> {
        // mặc định khi submit sẽ bị load trang => khắc phục
        e.preventDefault();

        // khi ấn submit => lấy ra những ô đã check
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")// lấy ra iput đã check

        // lấy ra hành động
        const typeChange = e.target.elements.type.value
        console.log(typeChange);

        if (typeChange == "delete-all")
        {
            const isConfirm = confirm(" Bạn có chắc chắn xóa không?");
            if(!isConfirm){
                return;
            }
        }
        //console.log(inputsChecked);

        if(inputsChecked.length > 0)
        {
            let ids = [];

            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id) // đẩy id vào mảng ids
            })
            //console.log(ids);
            // chuyển mảng thành text
            ids = ids.join(",");
           // console.log(ids);
            // thêm vào ô input
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            //console.log(inputIds);
            // gán value  = cái string trên
            inputIds.value = ids
            // sau đó submit form
            formChangeMulti.submit();
        }else{
            alert("vui lòng chọn ít nhất một bản ghi !!")
        }
    })
}

// xóa sản phẩm
// lấy ra button-delete
const buttonDelete = document.querySelectorAll("[button-delete]")
//console.log(buttonDelete);
if(buttonDelete.length > 0){
    // lấy ra form delete
    const formDelete = document.querySelector("#form-delete-item")
    // lấy ra đường dẫn bên font end
    const path = formDelete.getAttribute("data-path")

    buttonDelete.forEach(button => {
        //bắt sự kiện click button
        button.addEventListener("click", () => {
            const isConfirm = confirm(" Bạn có chắc muốn xóa sản phẩm này không?")

            // Nếu ng chọn ok
            if(isConfirm){
                const id = button.getAttribute("data-id")
                //console.log(id);

                // tạo action
                const action = `${path}/${id}?_method=DELETE`;
                //console.log(action);

                // gọi phương thức submit
                formDelete.action = action;
                formDelete.submit();

            }else{

            }
        })
    })
}