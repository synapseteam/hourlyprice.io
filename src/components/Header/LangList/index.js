/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18n";

import { styles } from "./styles";

const locales = ["en", "ru", "ua"];
export default function LangList() {
  const { i18n } = useTranslation();

  const langChangeHandler = (e) => {
    const value = e.currentTarget.value;
    changeLanguage(value);
  };

  return (
    <div css={styles.langContainer}>
      <select
        css={styles.langList}
        onChange={langChangeHandler}
        defaultValue={i18n.language}
      >
        {locales.map((item) => {
          return <option key={item} value={item} label={item} />;
        })}
      </select>
    </div>
  );
}
