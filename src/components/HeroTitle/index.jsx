/** @jsxImportSource @emotion/react */
import React from "react";
import { useCustomTranslation } from "i18n";

import { styles } from "./styles";

export default function HeroTitle() {
  const [t, Trans] = useCustomTranslation();

  return (
    <>
      <h1 css={() => styles.getStyle(null, "title")}>{t("heroTitle")}</h1>
      <h3 css={() => styles.getStyle(null, "subTitle")}>
        <Trans components={{ citation: <q /> }}>heroSubTitle</Trans>
      </h3>
    </>
  );
}
