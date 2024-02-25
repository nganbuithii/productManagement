const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")

// [GET] /
module.exports.index = async(req, res) => {
    // lấy ra keywork rồi truyền vào ô input tìm kiếm bên header để => giữ giá trị tìm kiếm
    const keyword = req.query.keyword
    const keywordRegex =  new RegExp(keyword,"i");// i là tìm kiếm khôn phan biệt chữ hoa chữ thường

    let newProduct=[]
    if(keyword){
        //- nếu truyền thẳng title:keyword thì nó phải tìm ĐÚNG => nó mới trả ra
        //- vì thế phải sử dụng regex
        const products = await Product.find({
            deleted:false,
            status:"active",
            title:keywordRegex
            //title:keyword
        });
        console.log(products);

        //- giá mới
         //- tính giá mới
         //- phải sử dụng let vì nếu sử dụng const thì trong if không truyền ra ngoài đc
        newProduct =productHelper.priceNewProducts(products)
    }
    
    res.render("client/pages/search/index",{
        pageTitle:"Kết quả tìm kiếm",
        keyword:keyword,
        products:newProduct
    })
}