import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createRecipe } from "../../api/recipes.js";
import { addRecipeRecord } from "../../redux/recipes/operations.js";
import css from "./AddRecipeModal.module.css";
import svg from "../../assets/icons.svg";

const AddRecipeModal = ({ onClose, onRecipeAdded }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      ingredients: "",
      instructions: "",
      notes: "",
      isFavorite: false,
      image: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const recipeData = {
        title: data.title,
        ingredients: data.ingredients
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i),
        instructions: data.instructions?.trim(),
        notes: data.notes?.trim(),
        isFavorite: data.isFavorite || false,
        date: data.date,
      };

      // Прибрати порожні поля
      Object.keys(recipeData).forEach((key) => {
        if (
          recipeData[key] === "" ||
          (Array.isArray(recipeData[key]) && recipeData[key].length === 0)
        ) {
          delete recipeData[key];
        }
      });

      const image = data.image?.[0] || null;

      const res = await dispatch(addRecipeRecord({ formData: recipeData, image })).unwrap();

      if (res?.data) {
        onRecipeAdded(res.data);  // Переконуємося, що ми додаємо коректний рецепт
      }
      
      reset();  // Очищаємо форму після додавання
      setSelectedImageName("");
      onClose();
    } catch (err) {
      console.error("Failed to create recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
      setValue("image", e.target.files);
    } else {
      setSelectedImageName("");
      setValue("image", "");
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>{t("addNewRecipe")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <input
            type="text"
            placeholder={t("title")}
            {...register("title", { required: true })}
          />

          <textarea
            placeholder={t("ingredientsCommaSeparated")}
            {...register("ingredients", { required: true })}
          />

          <textarea
            placeholder={t("instructions")}
            {...register("instructions")}
          />

          <textarea
            placeholder={t("notesOptional")}
            {...register("notes")}
          />

          <div className={css.favoriteWrapper}>
            <Controller
              name="isFavorite"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={css.favoriteButton}
                  aria-label="Toggle favorite"
                >
                  <svg
                    className={`${css.icon_action} ${
                      field.value ? css.icon_favorite_active : ""
                    }`}
                    width="18"
                    height="18"
                  >
                    <use xlinkHref={svg + "#icon-heart"}></use>
                  </svg>
                </button>
              )}
            />
            <span>{t("addToFavorites")}</span>
          </div>

          <label className={css.uploadContainer}>
            <span className={css.ordinaryText}>
              {selectedImageName || t("uploadPhoto")}
            </span>
            <input
              type="file"
              accept="image/*"
              className={css.hideBtn}
              onChange={handleImageChange}
            />
          </label>

          <button type="submit" disabled={loading} className={css.submitBtn}>
            {loading ? t("adding") : t("add")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;
