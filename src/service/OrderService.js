import service from './setingAPI';

const cartService = {
    getAll : async () => {
        const response = await service.get("/carts")
        return response;
      },
  
  
    addToCart : async (productId, quantity) => {
        const response = await service.post("/cart", {
            productId: productId,
            quantity: quantity
        })
          return response;
    },
    
    upQuantity : async (productId, quantity) => {
        const response = await service.put("/cart/up", {
            productId: productId,
            quantity: quantity
        })
          return response;
    },
    downQuantity : async (productId, quantity) => {
        const response = await service.put("/cart/down", {
            productId: productId,
            quantity: quantity
        })
          return response;
    },
    changeQuantity : async (productId, quantity) => {
        const response = await service.put("/cart/change", {
            productId: productId,
            quantity: quantity
        })
          return response;
    },
}


export default cartService
