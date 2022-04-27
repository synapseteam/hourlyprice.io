/** @jsxImportSource @emotion/react */
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../hooks";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import Footer from "../../components/Footer";
import BillDoc from "../../components/BillDoc";
import { styles } from "./styles";

export default function BillPage({ isDark }) {
  const [billItems, setBillItems] = useLocalStorage("billDocs", []);
  const [selectedBill, setSelectedBill] = useState(null);

  const setSelectedBillDoc = (docName) => {
    const selectedBill = billItems.find((item) => item.docName === docName);
    setSelectedBill(selectedBill);
  };

  return (
    <div css={styles.BillDoc}>
      <HeaderActOfWork
        isDark={isDark}
        billItems={billItems}
        setBillItems={setBillItems}
        setSelectedBillDoc={setSelectedBillDoc}
      />
      <BillDoc selectedBill={selectedBill} setBillItems={setBillItems} />
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
}

BillPage.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};
