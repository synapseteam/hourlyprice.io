/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import ActOfWorkDoc from "../../components/ActOfWorkDoc/index";
import Footer from "../../components/Footer";
import { useLocalStorage } from "../../hooks";
import { styles } from "./styles";
import { useState } from "react";

export default function ActOfWorkPage({ isDark }) {
  const [actOfWork, setActOfWork] = useLocalStorage("actOfWorkDocs", "initial");
  const [selectedAct, setSelectedAct] = useState("");

  return (
    <div css={styles.ActOfWorkDoc}>
      <HeaderActOfWork
        isDark={isDark}
        actOfWork={actOfWork}
        setSelectedAct={setSelectedAct}
      />
      <ActOfWorkDoc
        actOfWork={actOfWork}
        selectedAct={selectedAct}
        setActOfWork={setActOfWork}
      />
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
