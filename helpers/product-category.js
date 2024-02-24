const ProductCategory = require("../models/product-category.model")

//hàm để lấy sp của danh mục con
module.exports.getSubCategory =async (parentId) =>{
    const getCategory = async(parentId) => {
        //- tìm danh mục con giống cái parent ID
        //- subs: các danh mục con
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status:"active",
            deleted:false
        });
    
        let allSub = [...subs];// lấy ra 1 danh sách để chứa các subs
    
        for(const sub of subs){// lặp qua từng phần tử để lấy ra những thằng con nhỏ hơn nữa -- đệ quy
            const childs  = await getCategory(sub.id);
            allSub = allSub.concat(childs) // truyền các phần tử con vào allsub
        }
    
        return allSub;
    }
    const result = await getCategory(parentId)
    return result;
}