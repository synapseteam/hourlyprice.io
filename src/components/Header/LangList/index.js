/** @jsxImportSource @emotion/react */
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18n";
import UaLangIcon from "../../../assets/lang-ua-icon.png";
import UsLangIcon from "../../../assets/lang-us-icon.png";

import { styles } from "./styles";

export default function LangList() {
  const { t, i18n } = useTranslation();

  return (
    <div css={styles.langContainer} data-tip={t("switchLang")}>
      {i18n.language === "ua" && (
        <img
          onClick={() => changeLanguage("en")}
          css={styles.langIcon}
          src={UaLangIcon}
          alt="ukraine flag"
        />
      )}
      {i18n.language === "en" && (
        <img
          onClick={() => changeLanguage("ua")}
          css={styles.langIcon}
          src={UsLangIcon}
          alt="us flag"
        />
      )}
      <ReactTooltip place="bottom" effect="solid" />
    </div>
  );
}
