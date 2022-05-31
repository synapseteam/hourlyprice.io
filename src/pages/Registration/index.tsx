/** @jsxImportSource @emotion/react */
import { FC, Dispatch, SetStateAction } from "react";
import Registration from "../../components/Registration";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import { styles } from "./styles";

interface IProps {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

const RegistrationPage: FC<IProps> = ({ isDark, setIsDark }): JSX.Element => {
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
};

export default RegistrationPage;
