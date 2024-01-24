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
