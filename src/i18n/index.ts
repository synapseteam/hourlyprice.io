import i18n, { TFunction } from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
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



export function changeLanguage(lang: string): Promise<TFunction> {
  return i18n.changeLanguage(lang);
}
