function formatVND(price) {
    if (typeof price != 'string'){
        return  price.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "" + c : c;
        }) + 'đ';
    }else{
        return  price.replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "" + c : c;
        }) + 'đ';
    }
}

export default formatVND;