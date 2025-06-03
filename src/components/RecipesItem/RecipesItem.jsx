import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal.jsx";
import RecipeModal from "../RecipeModal/RecipeModal.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
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
}) => {
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
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
      setIsLoadingImage(true);
      formData.append("image", file);
      dispatch(uploadRecipeImage({ formData, recipeId })).finally(() => {
        setIsLoadingImage(false);
      });
    }
  };

  const confirmDelete = useCallback(() => {
    setModal(
      <DeleteModal
        onConfirm={() => {
          closeModal();
          setIsLoadingDelete(true);
          onDelete(recipeId).finally(() => {
            setIsLoadingDelete(false);
          });
        }}
        onCancel={closeModal}
      />
    );
  }, [setModal, closeModal, onDelete, recipeId]);

  const handleToggleFavorite = useCallback(() => {
    setIsLoadingFavorite(true);
    onToggleFavorite(recipeId).finally(() => {
      setIsLoadingFavorite(false);
    });
  }, [onToggleFavorite, recipeId]);

  const openModalView = useCallback(() => {
    setModal(
      <RecipeModal
        recipe={recipe}
        isReadOnly={true}
        onClose={closeModal}
      />
    );
  }, [setModal, recipe, closeModal]);

  return (
    <div onClick={openModalView} className={css.recipe_item_content}>
      {(isLoadingFavorite || isLoadingDelete) && (
        <div onClick={(e) => e.stopPropagation()} className={css.fullOverlay}>
          <LoaderComponent />
        </div>
      )}
      <div className={css.recipeImage}>
        {isLoadingImage ? (
          <div className={css.loader}>
            <LoaderComponent />
          </div>
        ) : (
          <img
            src={recipeImage || "/img/meals-icon.jpg"}
            alt="Recipe Image"
          />
        )}
        <label onClick={(e) => e.stopPropagation()}>
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
      <div className={css.recipeDetails}>
        <h2 className={css.truncatedH2}>{recipe.title}</h2>
        <span className={css.firstspan}>
          <p>Інгрідієнти:</p>
          <p className={css.truncated}>
            {Array.isArray(recipe.ingredients) && recipe.ingredients.join(", ")}
          </p>
        </span>
        <span>
          <p>Інструкція:</p>
          <p
            className={`${css.truncated} ${
              !recipe.instructions || recipe.instructions.trim() === "" ? css.empty : ""
            }`}
          >
            {recipe.instructions && recipe.instructions.trim() !== "" ? recipe.instructions : <>{t("empty")}</>}
          </p>

        </span>
        <span>
          <p>Примітки:</p>
          <p
            className={`${css.truncated} ${
              !recipe.notes || recipe.notes.trim() === "" ? css.empty : ""
            }`}
          >
            {recipe.notes && recipe.notes.trim() !== "" ? recipe.notes : <>{t("empty")}</>}
          </p>
        </span>
      </div>

      <div onClick={(e) => e.stopPropagation()} className={css.container_buttons}>
        <button
          className={css.favoriteButton}
          onClick={handleToggleFavorite}
          aria-label="Toggle favorite"
        >
          <svg
            className={`${css.icon_action} ${recipe.isFavorite ? css.icon_favorite_active : ""}`}
            width="18"
            height="18"
          >
            <use xlinkHref={svg + "#icon-heart"}></use>
          </svg>
        </button>
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
          className={css.deleteButton}
          onClick={confirmDelete}
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
