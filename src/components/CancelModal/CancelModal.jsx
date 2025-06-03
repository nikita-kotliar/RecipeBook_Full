import { useTranslation } from "react-i18next";
import css from "./CancelModal.module.css";
import svg from "../../assets/icons.svg";
import { ANIMATION } from "../../constants.js";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const CancelModal = ({ onClose }) => {
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsLoading);

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose(); 
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const handleCancel = () => {
  onClose(true); 
};


  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label={t("closeCancelModal")}
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={svg + "#icon-x"}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>{t("realyCancel")}</h2>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <button type="button" onClick={handleCancel} className={css.btnLogout}>
              {t("exit")}
            </button>
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

export default CancelModal;
