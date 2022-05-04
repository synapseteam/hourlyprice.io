/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import Registration from "../../components/Registration";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import { styles } from "./styles";

export default function RegistrationPage({ isDark, setIsDark }) {
  return (
    <div css={styles.registrationPage}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Registration />
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
}

RegistrationPage.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};
