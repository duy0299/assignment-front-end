function isCurrentMonth(strDate, month, year){
    let date = new Date(strDate);
    if(date.getMonth()+1 === month && date.getFullYear() === year){
        return true;
    }
    return  false;
}

export default isCurrentMonth;