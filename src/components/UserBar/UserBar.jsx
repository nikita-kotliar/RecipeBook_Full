import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import svgIcons from "../../assets/icons.svg";
import { selectUserPhoto } from "../../redux/auth/selectors.js";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";
import styles from "./UserBar.module.css";

const UserBar = ({ name }) => {
  const { t } = useTranslation();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [animatePopover, setAnimatePopover] = useState(false);
  const userBarPopoverRef = useRef(null);

  const userAvatar = useSelector(selectUserPhoto);
  const avatarPlaceholder = "/img/avatar-placeholder.jpg";

  const closePopover = () => {
    setAnimatePopover(false);
    setTimeout(() => setIsPopoverOpen(false), 300);
  };

  const handleOutsideClick = (e) => {
    if (e.target.name === "openPopover" && isPopoverOpen) {
      return;
    } else {
      if (
        userBarPopoverRef.current &&
        !userBarPopoverRef.current.contains(e.target)
      ) {
        closePopover();
      }
    }
  };

  const handlePopover = () => {
    if (!isPopoverOpen) {
      setIsPopoverOpen(true);
      setTimeout(() => setAnimatePopover(true), 10);
    } else {
      closePopover();
    }
  };

  return (
    <div className={`${styles.userBarWrapper} four-step`}>
      <button
        className={styles.userBar}
        type="button"
        name="openPopover"
        onClick={handlePopover}
        aria-label={t("openCloseUserPanel")}
      >
        {isPopoverOpen ? (
          <svg className={styles.userBarIcon}>
            <use xlinkHref={svgIcons + "#icon-chevron-up"}></use>
          </svg>
        ) : (
          <svg className={styles.userBarIcon}>
            <use xlinkHref={svgIcons + "#icon-chevron-down"}></use>
          </svg>
        )}
        <div
          className={styles.userBarAvatar}
          style={{ backgroundImage: `url(${userAvatar || avatarPlaceholder})` }}
        ></div>
      </button>
      {isPopoverOpen && (
        <UserBarPopover
          handleOutsideClick={handleOutsideClick}
          ref={userBarPopoverRef}
          animate={animatePopover}
          onClose={closePopover} // ➕ додано
        />
      )}
    </div>
  );
};

export default UserBar;
