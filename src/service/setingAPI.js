import axios from "axios";
import cookies from '../utils/cookies';

const user = (cookies.getUser()!==null)?cookies.getUser():"";
const urlAPI = "http://localhost:8080";

const sizePage = 4;


let service = axios.create({
    baseURL: urlAPI,
    headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
)

export default service;

export {sizePage}