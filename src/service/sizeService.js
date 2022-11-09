import cookies from '../utils/cookies';
import service from './setingAPI';

const sizeService = {
  
    getAll : async () => {
      const response = await service.get("/sizes")
      return response;
    },

    getById : async (id) => {
      return await service.get("/size/"+id)
    }, 


    insert : async (name) => {
      const response = await service.post("/size", {
        name: name
      })
      return response;
    },

    update : async (id, name) => {
      const response = await service.put("/size/"+id, {
        name: name
      })
      return response;
    },


    delete : async (id) => {
        return await service.get("/size/"+id, 
        {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
      },
    
}


export default sizeService
