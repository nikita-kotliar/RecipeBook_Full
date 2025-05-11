import UserPanel from "../UserPanel/UserPanel.jsx";
import RecipeList from "../RecipeList/RecipeList.jsx";
import styles from "./UserRecipes.module.css";

const UserRecipes = () => {
  return (
    <section className={styles.userRecipes}>
      <UserPanel />
      <RecipeList />
    </section>
  );
};

export default UserRecipes;
