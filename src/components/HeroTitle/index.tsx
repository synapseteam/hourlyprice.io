/** @jsxImportSource @emotion/react */
import { useTranslation, Trans } from "react-i18next";
import { styles } from "./styles";

const HeroTitle: React.FC = (): JSX.Element => {
  const [t] = useTranslation();

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{t("heroTitle")}</h1>
      <h3 css={styles.subTitle}>
        <Trans components={{ citation: <q /> }}>heroSubTitle</Trans>
      </h3>
    </div>
  );
};
export default HeroTitle;
