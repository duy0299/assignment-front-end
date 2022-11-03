import service, {sizePage} from './setingAPI';

const ratingService = {
    getById : async (id) => {
        return await service.get("/rating/"+id)
    },
    
    getAll : async () => {
        return await service.get("/ratings")
    },
    
    Insert : async (content, rating, modelId) => {
        
        return await service.post("/rating", {
            content : content,
            rating : rating,
            modelId : modelId
        })
    },
    
    UpdateStatus : async (id, status) => {
        return await service.put("/rating", {
            id : id,
            status : status
        })
    },

    delete : async (id) => {
        return await service.delete("/rating/"+id)
    },
}


export default ratingService
