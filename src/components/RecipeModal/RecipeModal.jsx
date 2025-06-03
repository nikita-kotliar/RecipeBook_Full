import css from "./RecipeModal.module.css";
import { useTranslation } from "react-i18next";

const RecipeModal = ({ recipe, onClose }) => {
  const { t } = useTranslation();

  if (!recipe) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modalDiv} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>{recipe.title}</h2>
        <div className={css.modal}>
          <button className={css.closeBtn} onClick={onClose}>×</button>

          <div className={css.imageContainer}>
            <img
              src={recipe.image || "/img/meals-icon.jpg"}
              alt={recipe.title}
              className={css.image}
            />
          </div>

          <div className={css.section}>
            <h3>{t("ingredients")}:</h3>
            <p>
              {Array.isArray(recipe.ingredients) && recipe.ingredients.join(", ")}
            </p>
          </div>

          <div className={css.section}>
            <h3>{t("instructions")}:</h3>
            <p>
              {recipe.instructions && recipe.instructions.trim() !== "" ? recipe.instructions : <>{t("empty")}</>}
            </p>

          </div>

          <div className={css.section}>
            <h3>{t("notes")}:</h3>
            <p>
              {recipe.notes && recipe.notes.trim() !== "" ? recipe.notes : <>{t("empty")}</>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
