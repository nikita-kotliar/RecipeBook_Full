import { useParams } from "react-router-dom";
import RecipesList from "../../components/RecipesList/RecipesList";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipesList, 
  fetchRecipesDetailsById, 
} from "../../redux/recipes/operations.js"; 
import { useTour } from "@reactour/tour";
import { selectIsNewUser } from "../../redux/auth/selectors.js";
import { setNewUser } from "../../redux/auth/slice.js";
import css from "./RecipesPage.module.css";

const RecipePage = () => {
  const { setIsOpen } = useTour();
  const { recipeId } = useParams(); 
  const dispatch = useDispatch();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);
  const isNewUser = useSelector(selectIsNewUser);

  useEffect(() => {
    if (isRefreshingPage) {
      dispatch(fetchRecipesList()); 
      if (recipeId) {
        dispatch(fetchRecipesDetailsById(recipeId)); 
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
    <div className={css.recipePage}>
      <RecipesList />
    </div>
  );
};

export default RecipePage;
