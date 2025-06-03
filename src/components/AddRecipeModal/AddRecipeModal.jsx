import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
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

  const autoResizeTextarea = (el) => {
    if (el) {
      el.style.height = "40px";
      el.style.height = el.scrollHeight + "px";
    }
  };

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

      Object.keys(recipeData).forEach((key) => {
        if (
          recipeData[key] === "" ||
          (Array.isArray(recipeData[key]) && recipeData[key].length === 0)
        ) {
          delete recipeData[key];
        }
      });

      const image = data.image?.[0] || null;

      const res = await dispatch(
        addRecipeRecord({ formData: recipeData, image })
      ).unwrap();

      if (res?.data) {
        onRecipeAdded(res.data);
      }

      reset();
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
      <div className={css.modalDiv} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.h2}>{t("addNewRecipe")}</h2>
        <div className={css.modal}>
          <button className={css.closeBtn} onClick={onClose}>
            ×
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <textarea
              placeholder={t("title")}
              {...register("title", { required: true })}
              onInput={(e) => autoResizeTextarea(e.target)}
              className={css.textarea}
            />
            {errors.title && <p className={css.error}>{t("requiredField")}</p>}

            <textarea
              placeholder={t("ingredientsCommaSeparated")}
              {...register("ingredients", { required: true })}
              onInput={(e) => autoResizeTextarea(e.target)}
              className={css.textarea}
            />
            {errors.ingredients && (
              <p className={css.error}>{t("requiredField")}</p>
            )}

            <textarea
              placeholder={t("instructions")}
              {...register("instructions")}
              onInput={(e) => autoResizeTextarea(e.target)}
              className={css.textarea}
            />

            <textarea
              placeholder={t("notesOptional")}
              {...register("notes")}
              onInput={(e) => autoResizeTextarea(e.target)}
              className={css.textarea}
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
                    <span>{t("addToFavorites")}</span>
                  </button>
                )}
              />
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
    </div>
  );
};

export default AddRecipeModal;
