import service, {sizePage} from './setingAPI';
const userService = {
    getById : async (id) => {
        return await service.get("/user/"+id)
    },

    getWithToken : async () => {
        return await service.get("/user/with-token")
    },
    
    getByPage : async (page) => {
        console.log(page, sizePage);
        return await service.get("/users",{
            params: {
              page: page,
              size: sizePage
            }
          })
    },
    
    UpdateStatus : async (id, status) => {
        return await service.put("/user/"+id, {
            id : id,
            status : status
        })
    },

    delete : async (id) => {
        return await service.delete("/user//+id"+id)
    },
}


export default userService
