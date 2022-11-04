import service from './setingAPI';

const orderService = {
    getAll : async () => {
        const response = await service.get("/orders")
        return response;
      },
  
  
    getById : async (id) => {
        const response = await service.get("/order/"+id)
          return response;
    },
    
    insert : async (address, note, cartProducts) => {
      let listProduct = [];
      for (const i in cartProducts) {
        let productCart = {
          productId: i.productId,
          quantity: i.quantity,
        }
        listProduct.push(productCart);
      }
     
        const response = await service.post("/order", {
            address: address,
            listProduct: cartProducts,
            note: note
        })
          return response;
    },
    updateStatus : async (id, status) => {
        const response = await service.put("/order/status/"+id, {
            status: status
        })
          return response;
    },
    delete : async (id) => {
        const response = await service.delete("/order/"+id)
          return response;
    },
}


export default orderService
