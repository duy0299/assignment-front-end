import cookies from '../utils/cookies';
import service, {serviceImage, sizePage} from './setingAPI';

const productModelService = {
  
    getAllBySatatus : async (page) => {
      const response = await service.get("/models/status-true", {
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

    getNewProduct : async () => {
      return await service.get("/models/new")
    },

    getMostPopularProduct : async () => {
      return await service.get("/models/most-popular")
    },

    getByCategories : async (categoryId, page) => {
      return await service.get("/models/by-category/"+categoryId, {
        params: {
          page: page,
          size: sizePage
        }
      })
    },

    search : async (nameProduct, page) => {
      const response = await service.get("/models/search", {
          params: {
          search: nameProduct,
          page: page,
          size: sizePage
        }
      })
      return response;
    },

    getByPriceRange : async (priceFrom, priceTo, page) => {
      const response = await service.get("/models/price-range", {
          params: {
          priceFrom: priceFrom,
          priceTo: priceTo,
          page: page,
          size: sizePage
        }
      })
      return response;
    },

    getById : async (id) => {
      return await service.get("/model/"+id)
    },

    getAll : async () => {
      const response = await service.get("/models")
      return response;
    },
    getByPage : async (page) => {
      const response = await service.get("/models/With-page", {
        params: {
          page: page,
          size: sizePage
        }
      })
      return response;
    },

    insertWithProducts : async (data) => {
      const response = await serviceImage.post("/model/with-products", data)
      return response;
    },
    updateImages : async (id, data) => {
      const response = await serviceImage.put("/model/"+id+"/images", data)
      return response;
    },
    updateInfo : async (id, name, description, priceRoot, categoriesID) => {
      console.log(id, name, description, priceRoot, categoriesID);
      const response = await serviceImage.put("/model/"+id+"/info", {
        name:  name,
        description: description,
        priceRoot:  priceRoot,
        categoriesID: categoriesID
      })
      return response;
    },
    updateStatus : async (id, status) => {
      const response = await service.put("/model/"+id+"/status?status="+status)
      return response;
    },
    delete : async (id) => {
      const response = await service.delete("/model/"+id)
      return response;
    },
    
}


export default productModelService
