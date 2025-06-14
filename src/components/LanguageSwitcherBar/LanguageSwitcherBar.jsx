import { forwardRef, useEffect } from "react";
import css from "./LanguageSwitcherBar.module.css";
import { LOCALS } from "../../i18n/constants";
import i18next from "i18next";
import clsx from "clsx";
const LanguageSwitcherBar = forwardRef(function LanguageSwitcherBar(
  { onClose, isRegistrationPage = false },
  ref
) {
  const langs = Object.values(LOCALS);

  const handleLanguageChange = (lng) => {
    i18next.changeLanguage(lng);
    onClose(false);
  };

  useEffect(() => {
    window.addEventListener("click", onClose);
    return () => window.removeEventListener("click", onClose);
  }, [onClose, ref]);

  return (
    <ul className={clsx(css.barPopover, {[css.barPopoverRegister]: isRegistrationPage, })} ref={ref}>
      {langs.map((len) => (
        <li key={len}>
          <button
            className={css.button}
            onClick={() => handleLanguageChange(len)}
          >
            {len.toLocaleUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
});

export default LanguageSwitcherBar;
