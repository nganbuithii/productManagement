//nếu có biến nào k có phải truyền sang ex : query
module.exports = (query) => {
  // mảng xử lí nút bấm để vẽ ra giao diện bộ lọc
    let filterStatus = [
        {
        name: "Tất cả",
        status: "",
        class: "",
        },
        {
        name: "Hoạt động",
        status: "active",
        },
        {
        name: "Dừng hoạt động",
        status: "inactive",
        },
    ];
    if (query.status) {
        // tìm vị trí bản ghi
        const index = filterStatus.findIndex(
        (item) => item.status == query.status
        );
        filterStatus[index].class = "active";
        //console.log(index);
    } else {
        const index = filterStatus.findIndex((item) => item.status == "");
        filterStatus[index].class = "active";
    }
    return filterStatus;
};
