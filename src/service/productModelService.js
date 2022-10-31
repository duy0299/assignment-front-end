import React from 'react'
import axios from 'axios';

import urlAPI from './urlAPI';

const productModelService = {
    makeRequest : async () => {
        axios.get("http://localhost:8080/models?page=0&size=3", {
            params: {
            //   page: 10,
            //   size: 1
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    TestAxios : async ()=>{
        const data=await axios.get(urlAPI+'/models', {
            params: {
              id: 1
            }
          })
          .then(function (response) {
       
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        return data;
      }
    
}


export default productModelService
