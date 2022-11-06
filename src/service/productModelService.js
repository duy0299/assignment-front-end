import service, {serviceImage, sizePage} from './setingAPI';

const productModelService = {
  
    getAllBySatatus : async (page) => {
      const response = await service.get("/models/status-true", {
          params: {
            page: page,
            size: sizePage
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

    getAll : async (page) => {
      console.log(page, sizePage);
      const response = await service.get("/models", {
        params: {
          page: page,
          size: sizePage
        }
      })
      return response;
    },

    insertWithProducts : async (data) => {
      console.log(data);
      const response = await serviceImage.post("/model/with-products", data)
      return response;
    },
    
}


export default productModelService
