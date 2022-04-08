import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { useTranslation, initReactI18next, Trans } from "react-i18next";

import { translationEN, translationRU, translationUA } from "i18n/translations";

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
      ua: { translation: translationUA },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export const useCustomTranslation = () => {
  const { t } = useTranslation();

  return [t, Trans];
};

export function changeLanguage(lang) {
  return i18n.changeLanguage(lang);
}
