import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import css from "./RecipesForm.module.css"; // Новий CSS файл для рецепта
// import clsx from "clsx";
// import svgSprite from "../../assets/icons.svg";
import { useDispatch } from "react-redux";
import {
  addRecipeRecord,
  updateRecipeRecord,
} from "../../redux/recipes/operations"; // Імпортуємо операції для рецептів
import LoaderComponent from "../LoaderComponent/LoaderComponent";

const RecipeForm = ({
  operationType = "add",
  recipeId,
  recipeData,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("recipeNameRequired")),
    photo: Yup.string().url(t("validUrlRequired")),
    description: Yup.string().optional(),
    ingredients: Yup.array()
      .of(Yup.string())
      .required(t("ingredientsRequired")),
    steps: Yup.string().required(t("stepsRequired")),
  });

  const {
    control,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: recipeData?.name || "",
      photo: recipeData?.photo || "",
      description: recipeData?.description || "",
      ingredients: recipeData?.ingredients.join(", ") || "",
      steps: recipeData?.steps || "",
    },
  });

  const onSubmit = (data) => {
    const recipeData = {
      name: data.name,
      photo: data.photo,
      description: data.description,
      ingredients: data.ingredients.split(", "), // Преобразовуємо у масив
      steps: data.steps,
    };

    setIsLoading(true);

    switch (operationType) {
      case "add":
        dispatch(addRecipeRecord(recipeData)).then(({ error }) => {
          if (!error) {
            setIsLoading(false);
            handleClose();
          } else {
            setIsLoading(false);
          }
        });
        break;
      case "edit":
        dispatch(
          updateRecipeRecord({ id: recipeId, formData: recipeData })
        ).then(({ error }) => {
          if (!error) {
            setIsLoading(false);
            handleClose();
          } else {
            setIsLoading(false);
          }
        });
        break;
      default:
        setIsLoading(false);
        break;
    }
  };

  const FormHeader = () => {
    switch (operationType) {
      case "add":
        return <p className={css.FormHeader}>{t("addRecipeTitle")}</p>;
      case "edit":
        return <p className={css.FormHeader}>{t("editRecipeTitle")}</p>;
      default:
        return <p className={css.FormHeader}>{t("addRecipe")}</p>;
    }
  };

  return (
    <form className={css.RecipeForm} onSubmit={handleSubmit(onSubmit)}>
      {FormHeader()}
      <label className={css.NameLabel}>
        {t("recipeName")}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className={css.InputField} />
          )}
        />
        {errors.name && <p className={css.Error}>{errors.name.message}</p>}
      </label>

      <label className={css.PhotoLabel}>
        {t("recipePhoto")}
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={css.InputField}
              placeholder="URL"
            />
          )}
        />
        {errors.photo && <p className={css.Error}>{errors.photo.message}</p>}
      </label>

      <label className={css.DescriptionLabel}>
        {t("recipeDescription")}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea {...field} className={css.InputField} />
          )}
        />
      </label>

      <label className={css.IngredientsLabel}>
        {t("recipeIngredients")}
        <Controller
          name="ingredients"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={css.InputField}
              placeholder={t("ingredientsPlaceholder")}
            />
          )}
        />
        {errors.ingredients && (
          <p className={css.Error}>{errors.ingredients.message}</p>
        )}
      </label>

      <label className={css.StepsLabel}>
        {t("recipeSteps")}
        <Controller
          name="steps"
          control={control}
          render={({ field }) => (
            <textarea {...field} className={css.InputField} />
          )}
        />
        {errors.steps && <p className={css.Error}>{errors.steps.message}</p>}
      </label>

      <button type="submit" className={css.SaveBtn} disabled={isLoading}>
        {isLoading ? <LoaderComponent height={44} width={44} /> : t("save")}
      </button>
    </form>
  );
};

export default RecipeForm;
