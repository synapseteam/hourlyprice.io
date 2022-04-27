/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import Footer from "../../components/Footer";
import BillDoc from "../../components/BillDoc";
import {styles} from "./styles";

export default function BillPage({isDark, setIsDark}) {
    return (
        <div css={styles.BillDoc}>
            <HeaderActOfWork isDark={isDark} setIsDark={setIsDark}/>
            <BillDoc/>
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
