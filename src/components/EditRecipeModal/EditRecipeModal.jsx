import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateRecipeRecord } from "../../redux/recipes/operations";
import css from "./EditRecipeModal.module.css";
import { useTranslation } from "react-i18next";
import CancelModal from "../CancelModal/CancelModal";

export const EditRecipeModal = ({ recipe, onClose }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const titleRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const notesRef = useRef(null);

  const autoResizeTextarea = (el) => {
    if (el) {
      el.style.height = "40px";
      el.style.height = el.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || "");
      setIngredients((recipe.ingredients || []).join(", "));
      setInstructions(recipe.instructions || "");
      setNotes(recipe.notes || "");
    }
  }, [recipe]);

  useEffect(() => {
    autoResizeTextarea(titleRef.current);
    autoResizeTextarea(ingredientsRef.current);
    autoResizeTextarea(instructionsRef.current);
    autoResizeTextarea(notesRef.current);
  }, [title, ingredients, instructions, notes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedRecipe = {
        title: title.trim(),
        ingredients: ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        instructions: instructions.trim(),
        notes: notes.trim(),
      };

      const id = recipe.id || recipe._id;

      await dispatch(updateRecipeRecord({ id, formData: updatedRecipe }));
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = () => {
    setShowCancelModal(true);
  };

  return (
    <>
      <div className={css.backdrop} onClick={(e) => {
        e.stopPropagation();
        openCancelModal();
      }}>
        <div className={css.modalDiv} onClick={(e) => e.stopPropagation()}>
          <h2>{t("editRecipe")}</h2>
          <div className={css.modal}>
            <button className={css.closeBtn} onClick={openCancelModal}>
              ×
            </button>
            <form className={css.form} onSubmit={handleSubmit}>
              <label className={css.label}>
                {t("title")}
                <textarea
                  ref={titleRef}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    autoResizeTextarea(titleRef.current);
                  }}
                  className={css.textarea}
                  required
                />
              </label>

              <label className={css.label}>
                {t("ingredientsCommaSeparated")}
                <textarea
                  ref={ingredientsRef}
                  value={ingredients}
                  onChange={(e) => {
                    setIngredients(e.target.value);
                    autoResizeTextarea(ingredientsRef.current);
                  }}
                  className={css.textarea}
                  required
                />
              </label>

              <label className={css.label}>
                {t("instructions")}
                <textarea
                  ref={instructionsRef}
                  value={instructions}
                  onChange={(e) => {
                    setInstructions(e.target.value);
                    autoResizeTextarea(instructionsRef.current);
                  }}
                  className={css.textarea}
                />
              </label>

              <label className={css.label}>
                {t("notesOptional")}
                <textarea
                  ref={notesRef}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    autoResizeTextarea(notesRef.current);
                  }}
                  className={css.textarea}
                />
              </label>

              <button className={css.submitBtn} type="submit" disabled={loading}>
                {loading ? t("updating") : t("update")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <CancelModal
          onClose={(shouldClose) => {
            setShowCancelModal(false);
            if (shouldClose) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default EditRecipeModal;
