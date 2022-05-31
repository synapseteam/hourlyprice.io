import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { useTranslation, initReactI18next, Trans, TFunction } from "react-i18next";
import { translationEN, translationUA } from "i18n/translations";

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources: {
      en: { translation: translationEN },
      ua: { translation: translationUA },
    },
    lng: localStorage.getItem("i18nextLng") || "en",
    interpolation: { escapeValue: false },
  });



export function changeLanguage(lang: string) {
  return i18n.changeLanguage(lang);
}
