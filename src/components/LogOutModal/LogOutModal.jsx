import { useTranslation } from "react-i18next";
import css from "./LogOutModal.module.css";
import svg from "../../assets/icons.svg";
import { ANIMATION } from "../../constants.js";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";
const ModalLogout = ({ onClose }) => {
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };
  const handleLogout = () => {
    dispatch(logOut()).then(({ error }) => {
      if (!error) {
        navigate("/");
        handleClose();
      }
    });
  };

  return (
    <div className={css.modal}>
      <button
        type="button"
        aria-label={t("closeLogOutModal")}
        onClick={handleClose}
        className={css.closeBtn}
      >
        <svg className={css.svg}>
          <use xlinkHref={svg + "#icon-x"}></use>
        </svg>
      </button>
      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>{t("logout")}</h2>
        <p className={css.modalText}>{t("confirmLogout")}</p>
      </div>
      <div className={css.modalBtnBox}>
        {isLoading ? (
          <LoaderComponent height={80} width={80} />
        ) : (
          <>
            <button type="button" onClick={handleLogout} className={css.btnLogout}>
              {t("logout")}
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

export default ModalLogout;
