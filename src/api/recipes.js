import { instance } from "../axios.js";

//===================== CREATE RECIPE =====================

export const createRecipe = async (recipe) => {
  const data = await instance.post("/recipes", recipe);
  return data;
};

//=================== UPDATE RECIPE ====================

export const updateRecipe = async (id, recipe) => {
  const data = await instance.patch(`/recipes/${id}`, recipe);
  return data;
};

//=================== DELETE RECIPE ====================

export const deleteRecipe = async (id) => {
  console.log("Deleting recipe with idввв:", id);
  const data = await instance.delete(`/recipes/${id}`);
  return data;
};

//================= GET ALL RECIPES =================

export const getAllRecipes = async (token) => {
  const { data } = await instance.get("/recipes", {
    headers: {
      Authorization: `Bearer ${token}`, // передаємо токен в заголовку
    },
  });
  return data;
};

//================= GET RECIPE DETAILS =================

export const fetchRecipesDetails = async (id) => {
  const { data } = await instance.get(`/recipes/${id}`);
  return data;
};

//================= GET RECIPE (BASIC) =================

export const fetchRecipes = async (id) => {
  const { data } = await instance.get(`/recipes/${id}`);
  return data;
};

//================= ADD TO FAVORITES =====================

export const addToFavorites = async (id) => {
  const data = await instance.patch(`/recipes/${id}/favorite`);
  return data;
};

//================= REMOVE FROM FAVORITES =====================

export const removeFromFavorites = async (id) => {
  const data = await instance.patch(`/recipes/${id}/unfavorite`);
  return data;
};

//================= GET FAVORITE RECIPES =====================

export const getFavoriteRecipes = async () => {
  const { data } = await instance.get("/recipes/favorites/all");
  console.log("getFavoriteRecipes data", data);
  return data;
};

//================= UPDATE RECIPE IMAGE =====================

// export const updateRecipeImage = async (formData) => {
//   const data = await instance.patch("/recipes/image", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };

export const updateRecipeImage = async (recipeId, formData) => {
  const data = await instance.patch(`/recipes/${recipeId}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("updateRecipeImage data", data);
  return data;
};