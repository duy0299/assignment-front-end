import service, { sizePage } from './setingAPI';

const orderService = {
    getAll : async (page) => {
        const response = await service.get("/orders", {
          params: {
            page: page,
            size: sizePage
          }
        })
        return response;
      },
  
    getById : async (id) => {
        const response = await service.get("/order/"+id)
          return response;
    },
    
    insert : async (address, note, cartProducts) => {
        const response = await service.post("/order", {
            address: address,
            listProduct: cartProducts,
            note: note
        })
          return response;
    },
    updateStatus : async (id, status) => {
        const response = await service.put("/order/"+id+"/status?status="+status)
          return response;
    },
    delete : async (id) => {
        const response = await service.delete("/order/"+id)
          return response;
    },
}


export default orderService
