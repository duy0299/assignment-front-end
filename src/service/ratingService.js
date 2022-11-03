import axios from 'axios';

import cookies from '../utils/cookies';
import urlAPI, {sizePage} from './setingAPI';
const user = (cookies.getUser()!==null)?cookies.getUser():"";
console.log(user);
const ratingService = {
    getById : async (id) => {
        return await axios.get(urlAPI+"/rating/"+id)
    },
    
    getAll : async () => {
        return await axios.get(urlAPI+"/ratings")
    },
    
    Insert : async (content, rating, modelId) => {
        
        return await axios.post(urlAPI+"/rating", {
            content : content,
            rating : rating,
            modelId : modelId
        },{
            headers : {
                "Authorization": `Bearer ${user.token}`
            }
        })
    },
    
    UpdateStatus : async (id, status) => {
        return await axios.put(urlAPI+"/rating", {
            id : id,
            status : status
        },
        {
            headers : {
                "Authorization": `Bearer ${user.token}`
            }
        })
    },

    delete : async (id) => {
        return await axios.delete(urlAPI+"/rating/"+id)
    },
}


export default ratingService
