import service from './setingAPI';

const categoriesService = {
  
    getAll : async () => {
      const response = await service.get("/categories")
      return response;
    },

    getById : async (id) => {
      return await service.get("/category/"+id)
    }, 


    insert : async (name, description, parentCategoriesId) => {
      const response = await service.post("/category", {
            params: {
                name: name,
                description: description,
                parentCategoriesId: parentCategoriesId
            }
      })
      return response;
    },

    update : async (id, name, description, parentCategoriesId) => {
      const response = await service.put("/category/"+id, {
            params: {
                name: name,
                description: description,
                parentCategoriesId: parentCategoriesId
            }
      })
      return response;
    },


    delete : async (id) => {
        return await service.get("/category/"+id)
      },
    
}


export default categoriesService
