// cập nhật số lượng sp trong giỏ hàng

// lấy ra ô input có name là quantity
const inputQuantity = document.querySelectorAll("input[name='quantity']")
if(inputQuantity.length > 0){
    inputQuantity.forEach(input => {
        // bắt sự kiện change
        input.addEventListener("change", (e) => {
            // lấy ra value bằng cách e.target.value
            //console.log(e.target.value);

            //- lấy ra ô input được change
            const productId = input.getAttribute("product-id")
            const quantity = parseInt(input.value)

            if(quantity > 0){
                window.location.href = `/cart/update/${productId}/${quantity}`
            }

        })
    })
}