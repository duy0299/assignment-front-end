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
          name: name,
          description: description,
          parentCategoriesId: parentCategoriesId
      })
      return response;
    },

    update : async (id, name, description, parentCategoriesId) => {
      let parent = (parentCategoriesId==='null')?null:parentCategoriesId;
      const response = await service.put("/category/"+id, {
          name: name,
          description: description,
          parentCategoriesId: parent
      })
      return response;
    },


    delete : async (id) => {
        return await service.delete("/category/"+id)
      },
    
}


export default categoriesService
