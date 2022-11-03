import axios from 'axios';

import urlAPI from './setingAPI';

const authService = {
  
    login : async (email, password) => {
        const response = await axios.post(urlAPI+"/login", {
          email: email,
          password: password
        })
          return response;
    },
    
    register : async (firstName, lastName, phoneNumber, gender, email, password, passwordConfirmation) => {
      return await axios.post(urlAPI+"/register", {
        firstName : firstName,
        lastName : lastName,
        phoneNumber : phoneNumber,
        gender : gender,
        email : email,
        password : password,
        passwordConfirmation : passwordConfirmation
      })
    }
}


export default authService
