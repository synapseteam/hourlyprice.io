/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import Logo from "components/Header/Logo";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/urls";
import ArrowIcon from "../../assets/arrow-right.png";
import ArrowWhiteIcon from "../../assets/arrow-right-white.png";
import { styles as headerStyles } from "../Header/styles";
import { styles } from "./styles";

export default function HeaderActOfWork({
  isDark,
  actOfWork,
  billItems,
  setSelectedActDoc,
  setSelectedBillDoc,
}) {
  return (
    <header css={headerStyles.header}>
      <Logo />
      <div css={headerStyles.rightHandContainer}>
        <div css={styles.actOfWork}>
          <Link css={styles.link} to={ROUTES.bill}>
            Рахунок-фактура
          </Link>
          <div css={styles.dropdown} data-comp="list">
            {billItems &&
              billItems.map((item) => {
                return (
                  <li
                    onClick={() => setSelectedBillDoc(item.docName)}
                    key={item.docName}
                  >
                    {item.docName}
                  </li>
                );
              })}
          </div>
        </div>
        <div css={styles.actOfWork}>
          <Link css={styles.link} to={ROUTES.actOfWork}>
            Акт виконаних робіт
          </Link>
          <div css={styles.dropdown} data-comp="list">
            {actOfWork &&
              actOfWork.map((item) => {
                return (
                  <li
                    onClick={() => setSelectedActDoc(item.docName)}
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
  billItems: PropTypes.array,
  setSelectedBillDoc: PropTypes.func,
  actOfWork: PropTypes.array,
  setSelectedActDoc: PropTypes.func,
};
