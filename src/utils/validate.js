const validate = {
    register(firstName, lastName, phoneNumber, gender, email, password, passwordConfirmation){
        if( firstName.trim()==="" || lastName.trim()==="" || passwordConfirmation.trim()==="" || 
            gender.trim()===""    || email.trim()===""    || password.trim()==="" || phoneNumber.trim()===""){
                
        }
    }
}



export default validate;