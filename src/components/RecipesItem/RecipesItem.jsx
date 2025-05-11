import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal.jsx";
import css from "./RecipesItem.module.css";
import { useModal } from "../../hooks/useModal";
import svg from "../../assets/icons.svg";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";
import { useTranslation } from "react-i18next";
import { uploadRecipeImage } from "../../redux/recipes/operations.js";

const RecipesItem = ({
  recipe,
  onDelete,
  onToggleFavorite,
  onRecipeUpdated,
  isLoading,
}) => {
  const recipeId = recipe._id || recipe.id;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const setModal = useModal();

  const recipeImage = useSelector((state) => {
    const recipes = state.recipes.recipes.data;
    const recipe = recipes.find((r) => r.id === recipeId);
    return recipe?.image || null;
  });

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModalEdit = useCallback(() => {
    setModal(
      <EditRecipeModal
        recipe={recipe}
        onClose={closeModal}
        onRecipeUpdated={(updatedRecipe) => {
          onRecipeUpdated(updatedRecipe);
          closeModal();
        }}
      />
    );
  }, [setModal, closeModal, recipe, onRecipeUpdated]);

  const handleImageChange = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (file) {
      formData.append("image", file);
      dispatch(uploadRecipeImage({ formData, recipeId }));
    }
  };

  const handleDeleteRecipe = useCallback(() => {
    onDelete(recipe.id);
  }, [onDelete, recipe]);

  const handleToggleFavorite = useCallback(() => {
    onToggleFavorite(recipeId);
  }, [onToggleFavorite, recipe]);

  return (
    <div className={css.recipe_item_content}>
      <h2>{recipe.title}</h2>
      <div className={css.recipeImage}>
        {!isLoading ? (
          <img
            src={recipeImage || "/img/avatar-placeholder.jpg"}
            alt="Recipe Image"
          />
        ) : (
          <div className={css.loader}>
            <LoaderComponent />
          </div>
        )}
        <label>
          <div className={css.uploadContainer}>
            <svg className={css.icon}>
              <use xlinkHref={svg + "#icon-upload"}></use>
            </svg>
            <span className={css.ordinaryText}>{t("uploadPhoto")}</span>
          </div>
          <input
            className={css.hideBtn}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <ul>
        {Array.isArray(recipe.ingredients) &&
          recipe.ingredients.map((ingredient, idx) => (
            <li key={ingredient + idx}>{ingredient}</li>
          ))}
      </ul>

      <p>{recipe.instructions}</p>
      <p>{recipe.notes}</p>

      <div className={css.container_buttons}>
        <button
          className={css.editButton}
          onClick={openModalEdit}
          aria-label="Edit the recipe"
        >
          <svg className={css.icon_action} width="14" height="14">
            <use xlinkHref={svg + "#icon-edit"}></use>
          </svg>
        </button>

        <button
          className={css.favoriteButton}
          onClick={handleToggleFavorite}
          aria-label="Toggle favorite"
        >
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <svg
              className={`${css.icon_action} ${
                recipe.isFavorite ? css.icon_favorite_active : ""
              }`}
              width="18"
              height="18"
            >
              <use xlinkHref={svg + "#icon-heart"}></use>
            </svg>
          )}
        </button>

        <button
          className={css.deleteButton}
          onClick={handleDeleteRecipe}
          aria-label="Delete the recipe"
        >
          <svg className={css.icon_action} width="14" height="14">
            <use xlinkHref={svg + "#icon-trash"}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipesItem;
