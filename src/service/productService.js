import cookies from '../utils/cookies';
import service, {serviceImage, sizePage} from './setingAPI';

const productService = {
  
    getAll : async (page) => {
      const response = await service.get("/products", {
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
      return response;
    },

    getById : async (id) => {
      return await service.get("/product/"+id)
    },

    insert : async (formData) => {
      return await serviceImage.post("/product",formData)
    },

    updateStatus : async (id, status) => {
      return await service.put("/product/"+id, {
        params: {
          status: status
        }
      })
    },
    updateInfo : async (id, name, saleType, priceSale, quantity, sizeID, modelID) => {
      return await service.put("/product/"+id, {
        name      : name,
        saleType  : saleType, 
        priceSale : priceSale, 
        quantity  : quantity, 
        sizeID    : sizeID, 
        modelID   : modelID,
      })
    },

    delete : async (id) => {
      const response = await service.delete("/product/"+id)
      return response;
    }
    
}


export default productService
