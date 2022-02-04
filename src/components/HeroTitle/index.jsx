/** @jsxImportSource @emotion/react */
import { useCustomTranslation } from "i18n";

import { styles } from "./styles";

export default function HeroTitle() {
  const [t, Trans] = useCustomTranslation();

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{t("heroTitle")}</h1>
      <h3 css={styles.subTitle}>
        <Trans components={{ citation: <q /> }}>heroSubTitle</Trans>
      </h3>
    </div>
  );
}
