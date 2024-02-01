// button status trên bộ lọc
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
      console.log(status);

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


// preview ảnh - gg search preview image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage){
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")

  const closeButton = document.querySelector("[close-button]")
  // lắng nghe sự kiện onchange

  uploadImage.addEventListener("change",(e)=>{
    
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src=URL.createObjectURL(file)
      closeButton.style.display = "block";
    }
  })

  closeButton.addEventListener("click",()=>{
    uploadImagePreview.src="";
    uploadImageInput.value="";
    closeButton.style.display = "none"
  })
}


// sort
const sort = document.querySelector("[sort]")
// neu co
if (sort){
  const sortSelect = sort.querySelector("[sort-select]")
  const sortClear = sort.querySelector("[sort-clear]")

  // sau khi phá vỡ cấu trúc xong thì truyền giá trị lên url
  let url = new URL (window.location.href)
  // lắng nghe sự kiện thay đổi
  sortSelect.addEventListener("change",(e)=>{
    const value = e.target.value;
    // phá vỡ cấu trúc
    const [sortKey, sortValue ] = value.split("-")// chuyển string thành 1 mảng
    // console.log(sortKey);
    
    // truyền url 
    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)
    window.location.href = url.href
  })

  // khi ấn clear thì set lại url ban đầu , lắng nghe sk " click"
  sortClear.addEventListener("click",() => {
    url.searchParams.delete("sortKey")
    url.searchParams.delete("sortValue")
    window.location.href = url.href
  })
  // thêm selected = true nếu opt đó được chọn
  const sortK = url.searchParams.get("sortKey")
  const sortV= url.searchParams.get("sortValue")

  // nếu có tồn tại thì
  if(sortK&& sortV){
    const stringSort = `${sortK}-${sortV}`
    //console.log(stringSort);
    // lấy ra opt đc chọn
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
    //console.log(optionSelected);
    optionSelected.selected = true;
  }
}