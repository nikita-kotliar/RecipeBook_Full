import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LOCALS } from "./constants";

import translationEN from "/src/locales/en/translation.json";
import translationES from "/src/locales/es/translation.json";
import translationUK from "/src/locales/uk/translation.json";

const resources = {
  [LOCALS.EN]: {
    translation: translationEN,
  },
  [LOCALS.ES]: {
    translation: translationES,
  },
  [LOCALS.UK]: {
    translation: translationUK,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
