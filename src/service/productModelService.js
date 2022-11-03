import axios from 'axios';

import service, {sizePage} from './setingAPI';

const productModelService = {
  
    getAllByPage : async (page) => {
      const response = await service.get("/models", {
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

    getByAllStatus : async () => {
      const response = await service.get("/models/all-status")
      return response;
    },
    
}


export default productModelService
