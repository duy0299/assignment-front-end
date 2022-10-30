function  timeCalculation(date) {
    let d1 = new Date(date);
    let now = new Date();
    let ms1 = d1.getTime();
    let ms2 = now.getTime();

    // xét xem cách bao nhiu rồi: phút giờ ngày tháng 
    // tháng
    if((ms2 - ms1) > (30*24*60*60*1000)){
        return Math.floor((ms2 - ms1) / (30*24*60*60*1000)) + ' Tháng trước';
    // ngày
    }else if((ms2 - ms1) > (24*60*60*1000)){
        return Math.floor((ms2 - ms1) / (24*60*60*1000)) + ' Ngày trước';
    // giờ
    }else if((ms2 - ms1) > (60*60*1000)){
        return Math.floor((ms2 - ms1) / (60*60*1000)) + ' Giờ trước';
    // phút 
    }else{
        return Math.floor((ms2 - ms1) / (60*1000)) + ' Phút trước';
    }
}

export  default timeCalculation;