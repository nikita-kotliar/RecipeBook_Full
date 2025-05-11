import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, lazy } from "react";
import css from "./RecipesList.module.css";
import {
  selectRecipes,
  selectRecipesLoading,
} from "../../redux/recipes/selectors.js";
import {
  deleteRecipe,
  addToFavorites,
  removeFromFavorites,
  getFavoriteRecipes,
  getAllRecipes,
} from "../../api/recipes.js";
import { setRecipes } from "../../redux/recipes/slice.js";
import { useTranslation } from "react-i18next";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const RecipesItem = lazy(() => import("../RecipesItem/RecipesItem.jsx"));
const AddRecipeModal = lazy(
  () => import("../AddRecipeModal/AddRecipeModal.jsx")
);

const RecipeList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesLoading);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState("title");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingRecipeId, setDeletingRecipeId] = useState(null);

  const handleDeleteRecipe = async (id) => {
    try {
      setDeletingRecipeId(id);
      await deleteRecipe(id);
      const all = await getAllRecipes();
      dispatch(setRecipes(all.data)); // Просто оновлюємо список з бекенду
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingRecipeId(null);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const index = recipes.findIndex((r) => r.id === id || r._id === id);
      if (index === -1) return;

      const updatedRecipe = recipes[index].isFavorite
        ? await removeFromFavorites(id)
        : await addToFavorites(id);

      const updated = [...recipes];
      updated[index] = updatedRecipe.data;

      dispatch(setRecipes(updated)); // Сортуємо рецепти за оновленими даними
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
  };

  const handleFavoritesToggle = async () => {
    const newValue = !showFavoritesOnly;
    setShowFavoritesOnly(newValue);

    try {
      if (newValue) {
        const favs = await getFavoriteRecipes();
        dispatch(setRecipes(favs.data));
      } else {
        const all = await getAllRecipes();
        dispatch(setRecipes(all.data));
      }
    } catch (err) {
      console.error("Failed to load recipes:", err);
    }
  };

  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return recipes;

    return recipes.filter((recipe) => {
      if (searchMode === "title") {
        return recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      }

      if (searchMode === "ingredients") {
        return recipe.ingredients?.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return true;
    });
  }, [recipes, searchQuery, searchMode]);

  if (isLoading) {
    return (
      <div className={css.recipeList}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={css.skeleton}></div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={css.controls}>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={css.searchInput}
        />

        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
          className={css.searchSelect}
        >
          <option value="title">{t("searchByTitle")}</option>
          <option value="ingredients">{t("searchByIngredients")}</option>
        </select>

        <button
          onClick={handleFavoritesToggle}
          className={css.favoriteToggleBtn}
        >
          {showFavoritesOnly ? t("showAllRecipes") : t("showFavoritesOnly")}
        </button>

        <button onClick={() => setShowAddModal(true)} className={css.addButton}>
          {t("addNewRecipe")}
        </button>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className={css.messageContainer}>
          <h2 className={css.noRecipes}>{t("noRecipesFound")}</h2>
        </div>
      ) : (
        <ul className={css.recipeList}>
          {filteredRecipes.map((recipe) => {
            const id = recipe._id ?? recipe.id;
            return (
              <li key={id} className={css.recipeWrapper}>
                <div className={css.recipeContainer}>
                  <RecipesItem
                    recipe={recipe}
                    onDelete={handleDeleteRecipe}
                    onToggleFavorite={handleToggleFavorite}
                    onRecipeUpdated={(res) => {
                      const updated = recipes.map((r) =>
                        (r.id || r._id) === id ? res.data : r
                      );
                      dispatch(setRecipes(updated));
                    }}
                    isLoading={deletingRecipeId === id}
                  />
                  {deletingRecipeId === id && (
                    <div className={css.loaderOverlay}>
                      <LoaderComponent />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showAddModal && (
        <AddRecipeModal
          onClose={() => setShowAddModal(false)}
          onRecipeAdded={(res) => {
            const newRecipe = res.data;
            dispatch(setRecipes([...recipes, newRecipe]));
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
};

export default RecipeList;
