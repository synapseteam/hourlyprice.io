/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import Logo from "components/Header/Logo";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/urls";
import ArrowIcon from "../../assets/arrow-right.png";
import ArrowWhiteIcon from "../../assets/arrow-right-white.png";
import { styles as headerStyles } from "../Header/styles";
import { styles } from "./styles";
import { useState } from "react";

export default function HeaderActOfWork({ isDark }) {
  const [selectedAct, setSelectedAct] = useState("");
  const actOfWork = JSON.parse(localStorage.getItem("actOfWorkDocs"));
  console.log(selectedAct);

  return (
    <header css={headerStyles.header}>
      <Logo />
      <div css={headerStyles.rightHandContainer}>
        <Link css={styles.link} to={ROUTES.bill}>
          Рахунок-фактура
        </Link>
        <div css={styles.actOfWork}>
          <Link css={styles.link} to={ROUTES.actOfWork}>
            Акт виконаних робіт
          </Link>
          <div css={styles.dropdown} data-comp="list">
            {actOfWork.map((item) => {
              return (
                <li
                  onClick={() => setSelectedAct(item.docName)}
                  key={item.docName}
                >
                  {item.docName}
                </li>
              );
            })}
          </div>
        </div>
        <Link css={styles.arrow} to={ROUTES.home}>
          {!isDark && <img css={styles.arrowImg} src={ArrowIcon} alt="arrow" />}
          {isDark && (
            <img css={styles.arrowImg} src={ArrowWhiteIcon} alt="arrow" />
          )}
        </Link>
      </div>
    </header>
  );
}

HeaderActOfWork.propTypes = {
  isDark: PropTypes.bool,
};
