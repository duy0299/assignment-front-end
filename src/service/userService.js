import service, {sizePage} from './setingAPI';
const userService = {
    getById : async (id) => {
        return await service.get("/user/"+id)
    },

    getWithToken : async () => {
        return await service.get("/user/with-token")
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
