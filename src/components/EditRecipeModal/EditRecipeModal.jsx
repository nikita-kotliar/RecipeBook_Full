import { useState, useEffect } from "react";
import css from "./EditRecipeModal.module.css";
import { updateRecipe } from "../../api/recipes.js";
import { useTranslation } from "react-i18next";

const EditRecipeModal = ({ onClose, onRecipeUpdated, recipe }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || "");
      setImage(recipe.image || "");
      setIngredients(recipe.ingredients?.join(", ") || "");
      setInstructions(recipe.instructions || "");
      setNotes(recipe.notes || "");
    }
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedRecipe = {
        title: title.trim(),
        ingredients: ingredients
          .trim()
          .split(",")
          .map((i) => i.trim()),
        instructions: instructions.trim(),
        notes: notes.trim(),
      };

      const res = await updateRecipe(recipe.id, updatedRecipe);
      onRecipeUpdated(res);
    } catch (err) {
      console.error("Failed to update recipe:", err);
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
        <h2>{t("editRecipe")}</h2>
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

          <button type="submit" disabled={loading} className={css.submitBtn}>
            {loading ? t("updating") : t("update")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeModal;
