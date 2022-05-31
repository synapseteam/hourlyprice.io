/** @jsxImportSource @emotion/react */
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction } from "react";
import { styles } from "./styles";

interface IProps {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}
const ThemeSwitcher: React.FC<IProps> = ({
  setIsDark,
  isDark,
}): JSX.Element => {
  const { t } = useTranslation();

  const handleThemeSwitcherClick = (): void => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  return (
    <div data-tip={t("changeTheme")}>
      {isDark ? (
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
};

export default ThemeSwitcher;
