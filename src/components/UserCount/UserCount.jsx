import { useState, useEffect } from "react";
import styles from "./UserCount.module.css";
import { requestUserCount } from "../../api/auth";
import { useTranslation } from "react-i18next";

const UserCount = () => {
  const { t } = useTranslation();
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    async function getCount() {
      try {
        const data = await requestUserCount();
        setUserCount(data.data.count);
      } catch (err) {
        console.log(err.message);
      }
    }

    getCount();
  }, []); 

  return (
    <div className={styles.userCountComponent}>
      <p>
        {t("numberUsers")}: {userCount !== null ? userCount : "..."}
      </p>
    </div>
  );
};

export default UserCount;
