/**
 * @format
 * @jsxImportSource @emotion/react
 */

import Logo from "components/Header/Logo";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/urls";
import ArrowIcon from "../../assets/arrow-right.png";
import ArrowWhiteIcon from "../../assets/arrow-right-white.png";
import { styles as headerStyles } from "../Header/styles";
import { IActDoc } from "typescript/interfaces";
import { Dispatch } from "react";
import { styles } from "./styles";

interface IProps {
  isDark: boolean;
  actOfWork: IActDoc[];
  setSelectedActDoc: Dispatch<string>;
  isActUpdated: boolean;
  isActAdded: boolean;
  billItems: IActDoc[];
  setSelectedBillDoc: Dispatch<string>;
  isBillUpdated: boolean;
  isBillAdded: boolean;
}

const HeaderActOfWork: React.FC<IProps> = ({
  isDark,
  actOfWork,
  setSelectedActDoc,
  isActUpdated,
  isActAdded,
  billItems,
  setSelectedBillDoc,
  isBillUpdated,
  isBillAdded,
}): JSX.Element => {
  return (
    <header css={headerStyles.header}>
      <Logo />
      <div css={headerStyles.rightHandContainer}>
        <div css={styles.actOfWork}>
          {isBillUpdated && (
            <div css={styles.actOfWorkUpdated}>Документ оновлено</div>
          )}
          {isBillAdded && (
            <div css={styles.actOfWorkUpdated}>Документ додано</div>
          )}
          <Link css={styles.link} to={ROUTES.bill}>
            Рахунок-фактура
          </Link>
          <div css={styles.dropdown} data-comp="hover">
            {billItems &&
              billItems.map((item, index) => {
                return (
                  <li
                    onClick={() => setSelectedBillDoc(item.docName)}
                    key={index}
                  >
                    {item.docName}
                  </li>
                );
              })}
          </div>
        </div>

        <div css={styles.actOfWork}>
          {isActUpdated && (
            <div css={styles.actOfWorkUpdated}>Документ оновлено</div>
          )}
          {isActAdded && (
            <div css={styles.actOfWorkUpdated}>Документ додано</div>
          )}
          <Link css={styles.link} to={ROUTES.actOfWork}>
            Акт виконаних робіт
          </Link>
          <div css={styles.dropdown} data-comp="hover">
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
};

export default HeaderActOfWork;
