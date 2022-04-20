/** @jsxImportSource @emotion/react */
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function ThemeSwitcher({ setIsDark, isDark }) {
  const { t } = useTranslation();
  const theme = useTheme();

  function handleThemeSwitcherClick() {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  }

  return (
    <div data-tip={t("changeTheme")}>
      {theme.name === "dark" ? (
        <Icon
          css={styles.icon}
          icon="emojione:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      ) : (
        <Icon
          css={styles.icon}
          icon="emojione-monotone:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      )}
      <ReactTooltip place="bottom" effect="solid" />
    </div>
  );
}

ThemeSwitcher.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};
