import css from "./AddWaterSecond.module.css";
import RecipeModal from "../../components/RecipeModal/RecipeModal";
import { useCallback } from "react";
import { useModal } from "../../hooks/useModal";
import { useTranslation } from "react-i18next";
import svg from "../../assets/icons.svg";

const AddRecipeBtn = () => {
  const setModal = useModal();
  const { t } = useTranslation();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<RecipeModal onClose={closeModal} operationType={"add"} />);
  }, [setModal, closeModal]);

  return (
    <button className={css.btnStyle} type="button" onClick={openModal}>
      <svg className={css.iconStyle} width="16" height="16">
        <use xlinkHref={svg + "#icon-plus"}></use>
      </svg>
      {t("addRecipe")}
    </button>
  );
};

export default AddRecipeBtn;
