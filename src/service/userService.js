import axios from 'axios';
import cookies from '../utils/cookies';
import service, {serviceImage, sizePage, urlAPI} from './setingAPI';
const userService = {
    getById : async (id) => {
        return await axios.get(urlAPI+"/user/"+id, {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
    },
    

    getWithToken : async () => {
        return await axios.get(urlAPI+"/user/with-token", {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        }
        )
    },
    
    getByPage : async (page) => {
        return await axios.get(urlAPI+"/users",{
            params: {
              page: page,
              size: sizePage
            },
            headers: {
              "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
            }
          })
    },
    
    updateStatus : async (id, status) => {
        return await axios.put(urlAPI+"/user/"+id+"/status?status="+status,{
        headers: {
          "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
        }})
    },
    updatePassword : async (password, newPassword, passwordConfirmation) => {
      return await service.put("/user/with-token/password", {
        password : password,
        newPassword : newPassword,
        passwordConfirmation : passwordConfirmation
      })
    },
    updateInfo : async (firstName, lastName, phoneNumber, gender) => {
      return await service.put("/user/with-token/info", {
        firstName : firstName,
        lastName : lastName,
        gender : gender,
        phoneNumber : phoneNumber
      })
    },
    updateAvatar : async (formData) => {
      return await serviceImage.put("/user/with-token/avatar", formData)
    },
    updateRoles : async (id, listRole) => {
        return await service.put("/user/"+id+"/roles", {
            listRole : listRole
        })
    },

    delete : async (id) => {
        return await service.delete("/user/"+id)
    },
}


export default userService
