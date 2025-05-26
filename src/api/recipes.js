import { instance } from "../axios.js";

export const createRecipe = async (recipe) => {
  const data = await instance.post("/recipes", recipe);
  return data;
};


export const updateRecipe = async (id, recipe) => {
  const data = await instance.patch(`/recipes/${id}`, recipe);
  return data;
};

export const deleteRecipe = async (id) => {
  console.log("Deleting recipe with idввв:", id);
  const data = await instance.delete(`/recipes/${id}`);
  return data;
};

export const getAllRecipes = async (token) => {
  const { data } = await instance.get("/recipes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchRecipesDetails = async (id) => {
  const { data } = await instance.get(`/recipes/${id}`);
  return data;
};

export const fetchRecipes = async (id) => {
  const { data } = await instance.get(`/recipes/${id}`);
  return data;
};


export const addToFavorites = async (id) => {
  const data = await instance.patch(`/recipes/${id}/favorite`);
  return data;
};


export const removeFromFavorites = async (id) => {
  const data = await instance.patch(`/recipes/${id}/unfavorite`);
  return data;
};

export const getFavoriteRecipes = async () => {
  const { data } = await instance.get("/recipes/favorites/all");
  console.log("getFavoriteRecipes data", data);
  return data;
};

export const updateRecipeImage = async (recipeId, formData) => {
  const data = await instance.patch(`/recipes/${recipeId}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("updateRecipeImage data", data);
  return data;
};