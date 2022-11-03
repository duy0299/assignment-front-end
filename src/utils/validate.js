import swal from 'sweetalert'


const validate = {
    register(firstName, lastName, phoneNumber, gender, email, password, passwordConfirmation){
        console.log({firstName, lastName, phoneNumber, gender, email, password, passwordConfirmation});
        if( firstName.trim()==="" || lastName.trim()==="" || passwordConfirmation.trim()==="" || 
            gender.trim()===""    || email.trim()===""    || password.trim()==="" || phoneNumber.trim()===""){
            
            swal("Chú ý", "Có thông chưa điền", "warning");
            return false;
        }
        if(firstName.length > 20 || lastName.length > 20){
            swal('Chú Ý','Tên quá dài\nTên tối đa 20 ký tự','warning');
            return false;
        }
        if(email.length > 50){
            swal('Chú Ý','Email quá dài\n tối đa 50 ký tự','warning');
            return false;
        }

        const patt = /^[0-9]{9,13}$/;
    
        if (patt.test(phoneNumber)) {
            swal('Chú Ý','Số điện thoại không hợp lệ','warning');
            return false;
        }
        
        const pattPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,20})$/;
        if(passwordConfirmation.length > 20 || password.length > 20 ){
            swal('Chú Ý','Mật khẩu quá dài\nMật khẩu tối đa 20 ký tự','warning');
            return false;
        }
        if(passwordConfirmation !== password ){
            swal('Chú Ý','xác nhận mật khẩu không khớp nhau','warning');
            return false;
        }
        if (!pattPass.test(password)) {
            swal('Chú Ý','Mật khẩu không khớp với định dạng\nPhải có ít nhất 1 số tự nhiên, 1 chữ viết hoa và 1 chữ viết thường và dài từ 8 - 20 ký tự','warning');
            return false;
        }
        return true;
    }
}



export default validate;


// swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this imaginary file!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((willDelete) => {
//     if (willDelete) {
//       swal("Poof! Your imaginary file has been deleted!", {
//         icon: "success",
//       });
//     } else {
//       swal("Your imaginary file is safe!");
//     }
//   });