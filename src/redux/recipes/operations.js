import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  // fetchRecipes,
  fetchRecipesDetails,
  getAllRecipes,
} from "../../api/recipes.js";
// import { t } from "i18next";
import { updateRecipeImage } from "../../api/recipes.js";

export const dateToUTC = (ms) => {
  const dateObject = new Date(Number(ms));
  return new Date(
    Date.UTC(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate(),
      dateObject.getHours(),
      dateObject.getMinutes()
    )
  );
};

export const dateToLocal = (ms) => {
  const dateObject = Number(ms);
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const localDateWithTimezone = dateObject + timezoneOffset;
  return localDateWithTimezone.toString();
};

//===================== ADD RECIPE =====================
export const addRecipeRecord = createAsyncThunk(
  "recipes/addRecipe",
  async ({ formData, image }, thunkAPI) => {
    try {
      // Створення рецепта
      const response = await createRecipe(formData);
      const recipeId = response.data.data.id;

      // Якщо є фото, оновлюємо його
      if (image) {
        const imgForm = new FormData();
        imgForm.append("image", image);
        const imgRes = await updateRecipeImage(recipeId, imgForm);
        response.data.data.image = imgRes.data.image;
      }

      // Повертаємо новий рецепт
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);




//=================== UPDATE RECIPE ====================
export const updateRecipeRecord = createAsyncThunk(
  "recipes/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      if (formData.date) {
        formData.date = String(dateToUTC(formData.date).getTime());
      }
      const { data } = await updateRecipe(id, formData);
      data.data.date = dateToLocal(data.data.date);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== DELETE RECIPE ====================
export const deleteRecipeRecord = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, thunkAPI) => {
    try {
      // Видалення рецепту на сервері
      const { data } = await deleteRecipe(id);
      // Повертаємо тільки id для оновлення списку в Redux
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== FETCH RECIPES ====================
export const fetchRecipesList = createAsyncThunk(
  "recipes/fetchAll",
  async (_, thunkAPI) => {
    console.log("Fetching recipes list...");
    try {
      // Отримуємо токен з localStorage або іншого місця

      const raw = localStorage.getItem("persist:auth");
      const parsed = JSON.parse(raw); // перетворюємо в об'єкт
      const token = parsed.token.replace(/"/g, "");
      // console.log(token);
      // Перевірка, чи є токен
      if (!token) {
        return thunkAPI.rejectWithValue("Token is missing");
      }

      // Запит з токеном авторизації
      const { data } = await getAllRecipes(token); // передаємо токен у функцію
      // console.log("Fetched recipes list first:", data);
      data.forEach((recipe) => {
        // console.log("recipe", recipe);
        if (recipe.createdAt) {
          recipe.createdAt = dateToLocal(recipe.createdAt);
        }
      });

      // console.log("Fetched recipes list:", data);
      return data; // повертаємо дані
    } catch (error) {
      // Обробка помилки
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//================ FETCH RECIPE DETAILS ================
export const fetchRecipesDetailsById = createAsyncThunk(
  "recipes/fetchDetails",
  async (id, thunkAPI) => {
    try {
      const { data } = await fetchRecipesDetails(id);
      if (data.data.date) {
        data.data.date = dateToLocal(data.data.date);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== UPLOAD PHOTO =====================


export const uploadRecipeImage = createAsyncThunk(
  "recipes/uploadRecipeImage",
  async ({ recipeId, formData }, thunkAPI) => {
    try {
      const response = await updateRecipeImage(recipeId, formData);
      return { recipeId, image: response.data.image };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        recipeId,
        error: err.response?.data?.data?.message || "Image upload failed",
      });
    }
  }
);