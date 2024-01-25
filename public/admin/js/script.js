// button status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  //lấy url
  let url = new URL(window.location.href);
  //console.log(url);

  // bắt sự kiện khi click vào nút
  buttonsStatus.forEach((button) => {
    //console.log(buttonsStatus);
    button.addEventListener("click", () => {
      // lấy ra status
      const status = button.getAttribute("button-status");
      //console.log(status);

      if (status) {
        //search set lại url- thêm param ?status=...
        url.searchParams.set("status", status);
      } else {
        // xóa param status
        url.searchParams.delete("status");
      }
      //console.log(url.href);
      window.location.href = url.href; //chuyển hướng
    });
  });
}

// tìm kiếm
const formSearch =document.querySelector("#form-search")
//nếu có
if(formSearch){
     //truyền vào url tìm kiếm
     let url = new URL(window.location.href);
    
    // bắt sự kiện ấn submit
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();// ngăn không cho load lại trang
        //console.log(e.target.elements.keyword.value);
        const kw = e.target.elements.keyword.value
        if (kw) {
            //search set lại url- thêm param ?status=...
            url.searchParams.set("keyword", kw);
        } else {
            // xóa param status
            url.searchParams.delete("keyword")
        }
          window.location.href = url.href; //chuyển hướng
    })
}

// xử lí khi click phân trang
const buttonPagination = document.querySelectorAll("[button-pagination]");
//console.log(buttonPagination);
if(buttonPagination){
    let url = new URL(window.location.href);

    buttonPagination.forEach((button) => {
        button.addEventListener("click",() =>{
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);
            window.location.href = url.href; //chuyển hướng
        })
    })
}