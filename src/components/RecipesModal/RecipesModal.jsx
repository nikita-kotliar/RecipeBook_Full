import { useTranslation } from "react-i18next";
import css from "./RecipesModal.module.css"; // Новий файл стилів
import RecipesForm from "../RecipesForm/RecipesForm"; // Створюємо форму для рецепту
import { ANIMATION } from "../../constants";
import svgSprite from "../../assets/icons.svg";

const RecipeModal = ({ operationType, onClose, recipe = {} }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const modalHeader = () => {
    switch (operationType) {
      case "add":
        return t("addRecipeTitle");
      case "edit":
        return t("editRecipeTitle");
      default:
        return t("addRecipeTitle");
    }
  };

  return (
    <div className={css.RecipeModal}>
      <h1>{modalHeader()}</h1>
      <RecipesForm
        operationType={operationType}
        recipe={recipe} // Передаємо рецепт, якщо він є
        handleClose={handleClose}
      />
      <button
        type="button"
        onClick={handleClose}
        aria-label={t("closeRecipeModal")}
        className={css.RecipeModalCloseBtn}
      >
        <svg>
          <use xlinkHref={svgSprite + "#icon-clear"}></use>
        </svg>
      </button>
    </div>
  );
};

export default RecipeModal;
