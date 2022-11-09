import cookies from '../utils/cookies';
import service, {serviceImage, sizePage} from './setingAPI';
const userService = {
    getById : async (id) => {
        let user = (cookies.getUser())?cookies.getUser():'';
        return await service.get("/user/"+id, 
        {
          headers: {
            "Authorization": `Bearer ${(user!=='')?user.token:""}`
          }
        })
    },
    

    getWithToken : async () => {
        return await service.get("/user/with-token", 
        {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
    },
    
    getByPage : async (page) => {
        return await service.get("/users",{
            params: {
              page: page,
              size: sizePage
            }
          })
    },
    
    updateStatus : async (id, status) => {
        return await service.put("/user/"+id+"/status", {
            id : id,
            status : status
        })
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
