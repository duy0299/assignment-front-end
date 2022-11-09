import cookies from '../utils/cookies';
import service, {sizePage} from './setingAPI';

const ratingService = {
    getById : async (id) => {
        return await service.get("/rating/"+id, 
        {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
    },
    
    getAll : async (page) => {
        return await service.get("/ratings", {
            params: {
              page: page,
              size: sizePage
            }
          }, 
          {
            headers: {
              "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
            }
          })
    },
    
    Insert : async (content, rating, modelId) => {
        
        return await service.post("/rating", {
            content : content,
            rating : rating,
            modelId : modelId
        }, 
        {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
    },
    
    UpdateStatus : async (id, status) => {
        return await service.put("/rating/"+id, {
            status : status
        }, 
        {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
    },

    delete : async (id) => {
        return await service.delete("/rating/"+id, 
        {
          headers: {
            "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
          }
        })
    },
}


export default ratingService
