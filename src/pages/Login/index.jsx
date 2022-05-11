/** @format */
/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";
import Header from "../../components/Header/index";

import Footer from "../../components/Footer/index";
import Login from "../../components/Login/index";

import { styles } from "./styles";

export default function LoginPage({ isDark, setIsDark }) {
  return (
    <div css={styles.loginPage}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Login />
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
}

LoginPage.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};
