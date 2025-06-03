import { useTranslation } from "react-i18next";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modalDiv} onClick={(e) => e.stopPropagation()}>
        <h2>{t("settings")}</h2>
        <div className={css.modal}>
          <button className={css.closeBtn} onClick={onClose}>
            ×
          </button>
          <UserSettingsForm handleClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
