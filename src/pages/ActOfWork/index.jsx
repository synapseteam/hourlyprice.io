/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import ActOfWorkDoc from "../../components/ActOfWorkDoc/index";
import Footer from "../../components/Footer";
import { styles } from "./styles";

export default function ActOfWorkPage({ isDark }) {
  return (
    <div css={styles.ActOfWorkDoc}>
      <HeaderActOfWork isDark={isDark} />
      <ActOfWorkDoc />
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
}

ActOfWorkPage.propTypes = {
  isDark: PropTypes.bool,
};
