
import css from "./GoogleBtn.module.css";
import { useTranslation } from "react-i18next";

const GoogleBtn = () => {
  const handleLogin = () => {
    window.open("https://recipebook-uicq.onrender.com/users/google", "_self");
  };


  const { t } = useTranslation();
  return (
    <button type="button" className={css.btn} onClick={handleLogin}>{t("continueWithGoogle")}</button>
  );
};

export default GoogleBtn;