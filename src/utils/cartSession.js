import swal from "sweetalert";
const cartName = 'cart'

const cartSession = {
    
    addToCart({productId, name, size, avatar, price, quantity},  method){
        if ( typeof(Storage) !== 'undefined') {
           
            let productsInCart = JSON.parse(sessionStorage.getItem(cartName));
            if(productsInCart === null || productsInCart===undefined){
                productsInCart = [];
            }
            let flag = false;
            let index = 0;
            for (let i in productsInCart) {
                if (productsInCart[i].productId === productId) {
    //                đã có trong giỏ hàng
                    flag = true;   
                    index = i;   
                    break;
                }
            }

            if (flag) {
    //          set quantity By method
                let modifiedCar = productsInCart[index];
                
                modifiedCar.quantity=  setQuantityByMethod( productsInCart[index].quantity, quantity, method) ;
                if(modifiedCar.quantity <= 0){
                    productsInCart.splice(index, 1);
                }else{
                    productsInCart.splice(index, 1, modifiedCar);
                }
            }else{
                let product = {
                    productId: productId,
                    name: name,
                    avatar: avatar,
                    price: price,
                    size: size,
                    quantity: quantity
                }
                if(quantity<1){
                    swal("chú ý", 'số lượng không thấp hơn 1', "warning");
                    return false;
                }
                productsInCart.push(product)
            }

            sessionStorage.setItem(cartName, JSON.stringify(productsInCart));
           if(method === 'default'){
            swal("Thành công", 'Đã thêm vào giỏ hàng', "success");
           }
           
        } else {
            swal("chú ý", 'Trình duyệt của bạn không hỗ trợ!', "warning");
        }
    },

    getCart(){
        let productsInCart = JSON.parse(sessionStorage.getItem(cartName));
        if (productsInCart) {
            console.log("ok");
            return productsInCart;
        }
        return [];
    },

    deleteCart(productId){
        let productsInCart = JSON.parse(sessionStorage.getItem(cartName));
            for (let i in productsInCart) {
                if (productsInCart[i].productId === productId) {
                    productsInCart.splice(i, 1);
                }
            }
        sessionStorage.setItem(cartName, JSON.stringify(productsInCart));
    }

}
export default cartSession;

function setQuantityByMethod( oldQuantity,  newQuantity,  method){
    switch (method){
        case "up":{
            return (oldQuantity + 1);
        }
        case "down":{
            return (oldQuantity - 1);
        }
        case "change":{
            return (newQuantity);
        }
        default:{
            return (oldQuantity + newQuantity);
        }
    }
}

