import service, {sizePage} from './setingAPI';
const userService = {
    getById : async (id) => {
        return await service.get("/user/"+id)
    },

    getWithToken : async () => {
        return await service.get("/user/with-token")
    },
    
    getAll : async () => {
        return await service.get("/users")
    },
    
    // UpdateStatus : async (id, status) => {
    //     return await service.put("/rating", {
    //         id : id,
    //         status : status
    //     })
    // },

    // delete : async (id) => {
    //     return await service.delete("/rating/"+id)
    // },
}


export default userService
