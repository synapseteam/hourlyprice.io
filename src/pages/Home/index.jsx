/**
 * @format
 * @jsxImportSource @emotion/react
 */

import PropTypes from "prop-types";
import Header from "../../components/Header/index";
import HeroTitle from "../../components/HeroTitle";
import PriceForm from "../../components/PriceForm";
import Display from "../../components/Display";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import { styles } from "./styles";

export default function HomePage({ isDark, setIsDark }) {
	return (
		<>
			<Header isDark={isDark} setIsDark={setIsDark} />

			<ContentContainer>
				<HeroTitle />
				<div css={styles.calculator}>
					<Display />
					<PriceForm />
				</div>
			</ContentContainer>

			<Footer
				companyName="Synapse Team LLC"
				companyUrl="https://synapseteam.com"
			/>
		</>
	);
}

HomePage.propTypes = {
	setIsDark: PropTypes.func.isRequired,
	isDark: PropTypes.bool,
};
