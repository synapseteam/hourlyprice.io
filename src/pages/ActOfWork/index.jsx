/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import ActOfWorkDoc from "../../components/ActOfWorkDoc/index";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";

export default function ActOfWorkPage({ isDark }) {
  return (
    <>
      <HeaderActOfWork isDark={isDark} />
      <ContentContainer>
        <ActOfWorkDoc />
      </ContentContainer>
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </>
  );
}

ActOfWorkPage.propTypes = {
  isDark: PropTypes.bool,
};
