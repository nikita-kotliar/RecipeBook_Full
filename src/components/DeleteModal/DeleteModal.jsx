import React from "react";
import css from "./DeleteModal.module.css";
import svg from "../../assets/icons.svg";
import { useTranslation } from "react-i18next";

const DeleteModal = ({ onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <div className={css.modal}>
      <button onClick={onCancel} className={css.closeBtn} aria-label="Close modal">
        <svg className={css.svg}>
          <use xlinkHref={`${svg}#icon-x`}></use>
        </svg>
      </button>

      <div className={css.modalTextBox}>
        <h2 className={css.modalTitle}>{t("confirmDeleteTitle")}</h2>
        <p className={css.modalText}>{t("confirmDeleteText")}</p>
      </div>

      <div className={css.modalBtnBox}>
        <button onClick={onConfirm} className={css.btnDelete}>
          {t("delete")}
        </button>
        <button onClick={onCancel} className={css.btnCancel}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
