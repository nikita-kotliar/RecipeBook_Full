import { createSlice } from "@reduxjs/toolkit";
import {
  addRecipeRecord,
  deleteRecipeRecord,
  updateRecipeRecord,
  fetchRecipesList,
  uploadRecipeImage,
} from "./operations";

const RECIPE_INITIAL_STATE = {
  recipes: {
    data: [],
    isLoading: false,
    isLoadingImage: {}, // тепер об'єкт, а не булеве значення
    isError: null,
    errorMessage: null,
  },
};

const sortRecipes = (arr) => {
  return [...arr].sort((a, b) => b.isFavorite - a.isFavorite);
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: RECIPE_INITIAL_STATE,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes.data = sortRecipes(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      // ======= fetch =======
      .addCase(fetchRecipesList.pending, (state) => {
        state.recipes.isLoading = true;
        state.recipes.errorMessage = null;
      })
      .addCase(fetchRecipesList.fulfilled, (state, action) => {
        state.recipes.isLoading = false;
        state.recipes.data = sortRecipes(
          action.payload.map((recipe) => ({
            ...recipe,
            isLoading: false,
            isError: null,
            errorMessage: null,
          }))
        );
      })
      .addCase(fetchRecipesList.rejected, (state, action) => {
        state.recipes.isLoading = false;
        state.recipes.errorMessage =
          action.payload || "Failed to fetch recipes";
      })

      // ======= add =======
      .addCase(addRecipeRecord.fulfilled, (state, action) => {
        state.recipes.data.push({
          ...action.payload.data,
          isLoading: false,
          isError: null,
          errorMessage: null,
        });
        state.recipes.data = sortRecipes(state.recipes.data);
      })

      // ======= update =======
      .addCase(updateRecipeRecord.pending, (state, action) => {
        const id = action.meta.arg.id;
        const recipe = state.recipes.data.find((r) => r.id === id);
        if (recipe) {
          recipe.isLoading = true;
          recipe.isError = null;
          recipe.errorMessage = null;
        }
      })
      .addCase(updateRecipeRecord.fulfilled, (state, action) => {
        const updated = {
          ...action.payload.data,
          isLoading: false,
          isError: null,
          errorMessage: null,
        };
        const index = state.recipes.data.findIndex(
          (recipe) => recipe.id === updated.id
        );
        if (index !== -1) {
          state.recipes.data[index] = updated;
        }
        state.recipes.data = sortRecipes(state.recipes.data);
      })
      .addCase(updateRecipeRecord.rejected, (state, action) => {
        const id = action.meta.arg.id;
        const recipe = state.recipes.data.find((r) => r.id === id);
        if (recipe) {
          recipe.isLoading = false;
          recipe.isError = true;
          recipe.errorMessage =
            action.error?.message || "Failed to update recipe";
        }
      })

      // ======= delete =======
      .addCase(deleteRecipeRecord.fulfilled, (state, action) => {
        const id = action.payload;
        state.recipes.data = state.recipes.data.filter(
          (recipe) => recipe.id !== id
        );
        state.recipes.data = sortRecipes(state.recipes.data);
      })
      .addCase(deleteRecipeRecord.rejected, (state) => {
        state.errorMessage = "Failed to delete recipe";
      })

      // ======= upload image =======
      .addCase(uploadRecipeImage.pending, (state, action) => {
        const { recipeId } = action.meta.arg;
        state.recipes.isLoadingImage[recipeId] = true;
        const recipe = state.recipes.data.find((r) => r.id === recipeId);
        if (recipe) {
          recipe.isLoading = true;
          recipe.isError = null;
          recipe.errorMessage = null;
        }
      })
      .addCase(uploadRecipeImage.fulfilled, (state, action) => {
        const { recipeId, image } = action.payload;
        state.recipes.isLoadingImage[recipeId] = false;
        const recipe = state.recipes.data.find((r) => r.id === recipeId);
        if (recipe) {
          recipe.image = image;
          recipe.isLoading = false;
          recipe.isError = null;
          recipe.errorMessage = null;
        }
      })
      .addCase(uploadRecipeImage.rejected, (state, action) => {
        const { recipeId, error } = action.payload || {};
        state.recipes.isLoadingImage[recipeId] = false;
        const recipe = state.recipes.data.find((r) => r.id === recipeId);
        if (recipe) {
          recipe.isLoading = false;
          recipe.isError = true;
          recipe.errorMessage = error || "Image upload failed";
        }
      });
  },
});

export const { setRecipes } = recipeSlice.actions;
export const recipesReducer = recipeSlice.reducer;
