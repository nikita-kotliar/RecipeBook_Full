export const selectRecipes = (state) => state.recipes.recipes.data;
export const selectRecipesLoading = (state) => state.recipes.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.recipes.errorMessage;
export const selectRecipeImage = (state) => state.recipes.recipeDetails.image;
// export const selectIsLoadingImage = (state) => state.recipes.recipes.isLoadingImage;
export const selectIsLoadingImage = (recipeId) => (state) =>
  state.recipes.recipes.isLoadingImage[recipeId] || false;
