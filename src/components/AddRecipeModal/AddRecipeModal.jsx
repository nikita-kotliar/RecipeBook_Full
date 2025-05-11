import { useState } from "react";
import css from "./AddRecipeModal.module.css";
import { createRecipe } from "../../api/recipes.js";
import { useTranslation } from "react-i18next";

const AddRecipeModal = ({ onClose, onRecipeAdded }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newRecipe = {
        title,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions,
      };

      if (image.trim()) newRecipe.image = image.trim();
      if (notes.trim()) newRecipe.notes = notes.trim();
      if (isFavorite) newRecipe.isFavorite = true;

      console.log("newRecipe", newRecipe);

      const res = await createRecipe(newRecipe);
      onRecipeAdded(res.data);
    } catch (err) {
      console.error("Failed to create recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>{t("addNewRecipe")}</h2>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            placeholder={t("title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder={t("imageURL")}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            placeholder={t("ingredientsCommaSeparated")}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />

          <textarea
            placeholder={t("instructions")}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />

          <textarea
            placeholder={t("notesOptional")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <label className={css.checkboxLabel}>
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            {t("addToFavorites")}
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
