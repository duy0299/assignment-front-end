import axios from 'axios';

import urlAPI, {sizePage} from './setingAPI';

const productModelService = {
  
    getAllByPage : async (page) => {
      const response = await axios.get(urlAPI+"/models", {
          params: {
            page: page,
            size: sizePage
          }
        })
      return response;
    },

    getNewProduct : async () => {
      return await axios.get(urlAPI+"/models/new")
    },

    getMostPopularProduct : async () => {
      return await axios.get(urlAPI+"/models/most-popular")
    },

    search : async (nameProduct, page) => {
      const response = await axios.get(urlAPI+"/models/search", {
          params: {
          search: nameProduct,
          page: page,
          size: sizePage
        }
      })
      return response;
    },

    getByPriceRange : async (priceFrom, priceTo, page) => {
      const response = await axios.get(urlAPI+"/models/price-range", {
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
      return await axios.get(urlAPI+"/model/"+id)
    },

    getByAllStatus : async () => {
      const response = await axios.get(urlAPI+"/models/all-status")
      return response;
    },
    
}


export default productModelService
