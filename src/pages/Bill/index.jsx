/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../hooks";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import Footer from "../../components/Footer";
import BillDoc from "../../components/BillDoc";
import { styles } from "./styles";

export default function BillPage({ isDark }) {
	const [billItems, setBillItems] = useLocalStorage("billDocs", []);
	const [selectedBill, setSelectedBill] = useState(null);
	const [isBillUpdated, setIsBillUpdated] = useState(false);
	const [isBillAdded, setIsBillAdded] = useState(false);

	useEffect(() => {
		if (isBillUpdated) {
			setTimeout(() => {
				setIsBillUpdated(false);
			}, 1800);
		}
	}, [isBillUpdated]);

	useEffect(() => {
		if (isBillAdded) {
			setTimeout(() => {
				setIsBillAdded(false);
			}, 1800);
		}
	}, [isBillAdded]);

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
				isBillAdded={isBillAdded}
				isBillUpdated={isBillUpdated}
			/>
			<BillDoc
				selectedBill={selectedBill}
				setBillItems={setBillItems}
				setIsBillAdded={setIsBillAdded}
				setIsBillUpdated={setIsBillUpdated}
			/>
			<div css={styles.noPreviewMessage}>
				Попередній перегляд не підтримується
			</div>
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
