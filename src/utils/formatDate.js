function formatDate(strDate){
    let date = new Date(strDate);
    let creDate = date.getDate() + '/' + (date.getMonth()+1) + '/' +date.getFullYear();
    return creDate;
}
export default formatDate;