import service, {sizePage} from './setingAPI';

const feedbackService = {
  
    getAll : async (page) => {
      const response = await service.get("/feedbacks", {
          params: {
            page: page,
            size: sizePage
          }
        })
      return response;
    },

    getById : async (id) => {
      return await service.get("/feedback/"+id)
    },

    insert : async (content) => {
      return await service.post("/feedback",{
        content: content
      })
    },

    updateStatus : async (id, status) => {
      return await service.put("/feedback/"+id, {
        params: {
          status: status
        }
      })
    },
    updateInfo : async (id, name, saleType, priceSale, quantity, sizeID, modelID) => {
      return await service.put("/feedback/"+id, {
        name      : name,
        saleType  : saleType, 
        priceSale : priceSale, 
        quantity  : quantity, 
        sizeID    : sizeID, 
        modelID   : modelID,
      })
    },

    delete : async (id) => {
      const response = await service.delete("/feedback/"+id)
      return response;
    }
    
}


export default feedbackService
