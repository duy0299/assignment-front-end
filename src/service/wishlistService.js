import axios from 'axios';

import service from './setingAPI';

const wishlistService = {
  
    getById : async (id) => {
        const response = await service.get("/wishlist/"+id)
          return response;
    },

    getAll : async () => {
      const response = await service.get("/wishlists")
        return response;
    },

    insert : async (modelId) => {
      return await service.post("/wishlist", 
      {
        modelId : modelId
      })
    },
    
    updateStatus : async (id, status) => {
      return await service.put("/wishlist/status/"+id, {status : status})
    },

    delete : async (id) => {
      const response = await service.delete("/wishlist/"+id)
        return response;
  },
}


export default wishlistService