module.exports = (query) => {
  // tìm kiếm theo key
  let objectSearch = {
    keyword : "",
    regex:""
  }
  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    // search doc regex javascript
    const regex = new RegExp(objectSearch.keyword, "i"); // timf kieems tên sp có tên đó, không phân biệt chữ hoa chữ thường
    objectSearch.regex = regex;
  }
  return objectSearch;
};
// phải return