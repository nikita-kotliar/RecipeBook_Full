import { useCallback } from "react";
import css from "./AddRecipeBtn.module.css"; // перейменуй або створи новий файл стилів
import { useModal } from "../../hooks/useModal";
import svgSprite from "../../assets/icons.svg";
import RecipeModal from "../RecipeModal/RecipeModal"; // замість WaterModal
import { useTranslation } from "react-i18next";

const AddRecipeBtn = () => {
  const setModal = useModal();
  const { t } = useTranslation();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<RecipeModal onClose={closeModal} operationType="add" />);
  }, [setModal, closeModal]);

  return (
    <button type="button" className={`${css.btnAdd}`} onClick={openModal}>
      <svg className={css.plus}>
        <use xlinkHref={svgSprite + "#icon-plus"} />
      </svg>
      <h2 className={css.btnText}>{t("addRecipe")}</h2>
    </button>
  );
};

export default AddRecipeBtn;
