import React from "react";
import { useCustomTranslation } from "i18n";

export default function HeroTitle() {
  const [t, Trans] = useCustomTranslation();

  return (
    <>
      <h1>{t("heroTitle")}</h1>
      <h3>
        <Trans components={{ citation: <q /> }}>heroSubTitle</Trans>
      </h3>
    </>
  );
}
