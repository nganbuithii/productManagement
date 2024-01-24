module.exports = (objectPagination, query, countProduct) => {
  if (query.page) {
    //nếu ng dùng truyền page
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItemms;
  //console.log(objectPagination.currentPage);

  const totalPage = Math.ceil(countProduct / objectPagination.limitItemms);

  // add thêm key vào objPagination
  objectPagination.totalPage = totalPage;
  return objectPagination;
};
