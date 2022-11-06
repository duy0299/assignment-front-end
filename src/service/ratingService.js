import service, {sizePage} from './setingAPI';

const ratingService = {
    getById : async (id) => {
        return await service.get("/rating/"+id)
    },
    
    getAll : async (page) => {
        return await service.get("/ratings", {
            params: {
              page: page,
              size: sizePage
            }
          })
    },
    
    Insert : async (content, rating, modelId) => {
        
        return await service.post("/rating", {
            content : content,
            rating : rating,
            modelId : modelId
        })
    },
    
    UpdateStatus : async (id, status) => {
        return await service.put("/rating/"+id, {
            status : status
        })
    },

    delete : async (id) => {
        return await service.delete("/rating/"+id)
    },
}


export default ratingService
