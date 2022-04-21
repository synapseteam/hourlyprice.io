/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";

export default function ActOfWorkPage({ isDark }) {
  return (
    <>
      <HeaderActOfWork isDark={isDark} />
    </>
  );
}

ActOfWorkPage.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};
