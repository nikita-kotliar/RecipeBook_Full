import UserCount from "../UserCount/UserCount.jsx";
import css from "./AdvantagesSection.module.css";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.advantagesSection}>
      <div className={css.userCount}>
        <UserCount />
      </div>
    </div>
  );
};

export default AdvantagesSection;
