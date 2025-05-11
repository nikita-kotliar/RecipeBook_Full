import svg from "../../assets/icons.svg";
import css from "./DeleteWaterModal.module.css";
import BtnDelete from "../BtnDelete/BtnDelete.jsx";
import { ANIMATION } from "../../constants.js";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipeThunk } from "../../redux/recipes/operations.js"; // зміни тут
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const ModalDeleteRecipe = ({ id, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    const timeoutId = setTimeout(() => {
      onClose();
      clearTimeout(timeoutId);
    }, ANIMATION.DURATION);
  };

  const handleDelete = () => {
    setIsLoading(true);
    dispatch(deleteRecipeThunk(id)).then(({ error }) => {
      if (!error) {
        handleClose();
      }
      setIsLoading(false);
    });
  };

  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label={t("closeDeleteEntryModal")}
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={svg + "#icon-x"}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>{t("deleteRecipe")}</h2>
        <p className={css.modalText}>{t("confirmDeleteRecipe")}</p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <BtnDelete handleDelete={handleDelete} id={id} />
            <button
              type="button"
              onClick={handleClose}
              className={css.btnCancel}
            >
              {t("cancel")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalDeleteRecipe;
