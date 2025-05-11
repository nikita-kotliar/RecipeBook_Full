import { useParams } from "react-router-dom";
// import RecipeDetailedInfo from "../../components/RecipeDetailedInfo/RecipeDetailedInfo.jsx";
import RecipesList from "../../components/RecipesList/RecipesList";
import UserBar from "../../components/UserBar/UserBar.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipesList, // Операція для отримання всіх рецептів
  fetchRecipesDetailsById, // Операція для отримання деталей рецепту
} from "../../redux/recipes/operations.js"; // Оновлено для рецептів
// import { parseDateTime } from "../../helpers/parseDate.js"; // Якщо потрібно
import { useTour } from "@reactour/tour";
import { selectIsNewUser } from "../../redux/auth/selectors.js";
import { setNewUser } from "../../redux/auth/slice.js";

const RecipePage = () => {
  const { setIsOpen } = useTour();
  const { recipeId } = useParams(); // Отримуємо ID рецепту для перегляду деталей
  const dispatch = useDispatch();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);
  const isNewUser = useSelector(selectIsNewUser);

  useEffect(() => {
    if (isRefreshingPage) {
      dispatch(fetchRecipesList()); // Отримуємо всі рецепти
      if (recipeId) {
        dispatch(fetchRecipesDetailsById(recipeId)); // Отримуємо деталі рецепту, якщо є ID
      }
      setIsRefreshingPage(false);
    }
  }, [isRefreshingPage, recipeId, dispatch]);

  useEffect(() => {
    if (isNewUser) {
      setIsOpen(true);
      dispatch(setNewUser(false));
    }
  }, [isNewUser, setIsOpen, dispatch]);

  return (
    <>
      <RecipesList /> {/* Головна інформація про рецепти */}
      <UserBar /> {/* Головна інформація про рецепти */}
      {/* <RecipeDetailedInfo /> Детальна інформація про конкретний рецепт */}
    </>
  );
};

export default RecipePage;
