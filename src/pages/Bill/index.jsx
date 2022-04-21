/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";

export default function BillPage({ isDark, setIsDark }) {
  return (
    <>
      <HeaderActOfWork isDark={isDark} setIsDark={setIsDark} />
    </>
  );
}

BillPage.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};
