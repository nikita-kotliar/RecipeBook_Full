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
import Logo from "../Logo/Logo"
import UserBar from "../UserBar/UserBar.jsx";
import svg from "../../assets/icons.svg";
import { useEffect } from "react";

const RecipesItem = lazy(() => import("../RecipesItem/RecipesItem.jsx"));
const AddRecipeModal = lazy(() => import("../AddRecipeModal/AddRecipeModal.jsx"));

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
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(false);


  const handleDeleteRecipe = async (id) => {
    try {
      setDeletingRecipeId(id);
      await deleteRecipe(id);
      const all = await getAllRecipes();
      dispatch(setRecipes(all.data));
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

      dispatch(setRecipes(updated));
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
  };

  const handleFavoritesToggle = async () => {
    const newValue = !showFavoritesOnly;
    setShowFavoritesOnly(newValue);
    setIsFetchingRecipes(true);

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
    } finally {
      setIsFetchingRecipes(false);
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
        <Logo className={css.logo} />
        <div className={css.controlsInner}>
          <button
            onClick={handleFavoritesToggle}
            className={css.favoriteToggleBtn}
          >
            {showFavoritesOnly ? t("showAllRecipes") : t("showFavoritesOnly")}
          </button>

          <button onClick={() => setShowAddModal(true)} className={css.addButton}>
            {t("addNewRecipe")}
          </button>

          <UserBar className={css.userBar} />
        </div>
      </div>
      <div className={css.searchBox}>
        <svg className={css.iconSearch}>
          <use xlinkHref={svg + "#icon-search"}></use>
        </svg>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={css.searchInput}
        />

        <div className={css.selectWrapper}>
          <select
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value)}
            className={css.searchSelect}
          >
            <option value="title">{t("searchByTitle")}</option>
            <option value="ingredients">{t("searchByIngredients")}</option>
          </select>
          
          <svg className={css.icon}>
            <use xlinkHref={svg + "#icon-chevron-down"}></use>
          </svg>
        </div>

      </div>

      {isFetchingRecipes ? (
        <div className={css.loaderWrapper}>
          <LoaderComponent />
        </div>
      ) : filteredRecipes.length === 0 ? (
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
                        (r.id || r._id) === res.id ? res : r
                      );
                      dispatch(setRecipes(updated));
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showAddModal && (
        <AddRecipeModal
          onClose={() => setShowAddModal(false)}
          onRecipeAdded={(newRecipe) => {
            dispatch(setRecipes([...recipes, newRecipe])); // додати рецепт до списку
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
};

export default RecipeList;
