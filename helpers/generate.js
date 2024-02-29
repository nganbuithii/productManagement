// hàm tạo string token random
module.exports.generateRandomString = (length) =>{
    const character = "ABCDEFGHIJKLMNOPQRSTUVXYZWabcdefghijklmnopqrstuvwxyz0123456789"
    
    // length : số kí tự muốn random
    let result = "";
    for (let i=0; i< length;i++){
        result += character.charAt(Math.floor(Math.random() * character.length))
    }
    return result;
}
module.exports.generateRandomNumber = (length) =>{
    const character = "0123456789"
    
    // length : số kí tự muốn random
    let result = "";
    for (let i=0; i< length;i++){
        result += character.charAt(Math.floor(Math.random() * character.length))
    }
    return result;
}