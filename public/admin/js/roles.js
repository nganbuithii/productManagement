//***********permission

//*- lấy ra bảng permission
const tablePermission = document.querySelector("[table-permission]");
//console.log(tablePermission);
//- check nếu có
if (tablePermission) {
  //- lấy ra nút submit
  const buttonSubmit = document.querySelector("[button-submit]");
  //console.log(buttonSubmit);

  //- bắt sự kiện click cho nút submit
  buttonSubmit.addEventListener("click", () => {
    //- lấy ra các ô input đã check => lưu vào 1 mảng
    let permission = [];

    //- lấy theo data-name
    const rows = tablePermission.querySelectorAll("[data-name]");
    //console.log(rows);

    //- lặp
    rows.forEach((row) => {
      //- lấy ra dataname
      const name = row.getAttribute("data-name");
      //console.log(name);
      const inputs = row.querySelectorAll("input");

      // check nếu name = id ( k cần lưu vào permission)
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          //console.log(id);

          // thêm vào mảng permission
          permission.push({
            id: id,
            permission: [],
          });
        });
      } else {
        // thì nó cũng sẽ có 2 ô input - lặp - lấy ra ô đã check
        //- index = 0 cột 1, indexx =1 => cột 2
        inputs.forEach((input, index) => {
          const checked = input.checked;
          //console.log(name);
          //console.log(index);
          //console.log(checked);
          if (checked) {
            permission[index].permission.push(name);
          }
        });
      }
    });
    //console.log(permission);

    //- lưu mảng permission vào ô input
    if (permission.length > 0) {
      const formChangePermission = document.querySelector(
        "#form-change-permission"
      );
      const inputPermission = formChangePermission.querySelector(
        "input[name='permission']"
      );

      // gán value = mảng, LƯU Ý: input lưu dạng chuỗi mà permission trên là mảng
      //- chuyển mảng thành chuỗi json
      inputPermission.value = JSON.stringify(permission);

      // submit form
      formChangePermission.submit();
    }
  });
}

// xử lí data permission checked - là checked các ô đã phân quyền trước đó
//- lấy ra data records
const dataRecords = document.querySelector("[data-records]");
//console.log(dataRecords);
if (dataRecords) {
  // chuyển thành mảng
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  //console.log(records);
  const tablePermission = document.querySelector("[table-permission]");

  records.forEach((record, index) => {
    const permission = record.permission;
    //console.log(permission);

    // lặp qua permission để lấy ra data-name
    permission.forEach((item) => {
      const row = tablePermission.querySelector(`[data-name="${item}"]`);
      // tìm ô input có inđex
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}

// xóa quyền
// xóa sản phẩm

// lấy ra button-delete

const buttonDelete = document.querySelectorAll("[button-delete]");

//console.log(buttonDelete);

if (buttonDelete.length > 0) {
  // lấy ra form delete
    const formDelete = document.querySelector("#form-delete-item");

    // lấy ra đường dẫn bên font end
    const path = formDelete.getAttribute("data-path");
    buttonDelete.forEach((button) => {
        //bắt sự kiện click button
        button.addEventListener("click", () => {
        const isConfirm = confirm(" Bạn có chắc muốn xóa sản phẩm này không?");
        // Nếu ng chọn ok
        if (isConfirm) {
            const id = button.getAttribute("data-id");

        // tạo action
        const action = `${path}/${id}?_method=DELETE`;
        // gọi phương thức submit

        formDelete.action = action;
        formDelete.submit();
    } else {
    }
    });
    })
}

