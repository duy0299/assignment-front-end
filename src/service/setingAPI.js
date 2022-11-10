import axios from "axios";
import cookies from '../utils/cookies';


const urlAPI = "http://localhost:8080";

const sizePage = 4;


const service = axios.create({
    baseURL: urlAPI,
    headers: {
        "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
      }
    }
)

const serviceImage = axios.create({
    baseURL: urlAPI,
    headers: {
      "Authorization": `Bearer ${(cookies.getUser()!==null)?cookies.getUser().token:""}`
    },
    enctype: 'multipart/form-data'
  }
)


export default service;

export {sizePage, serviceImage, urlAPI}