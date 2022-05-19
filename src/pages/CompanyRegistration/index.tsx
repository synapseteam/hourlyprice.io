/** @jsxImportSource @emotion/react */
import { Dispatch, FC, SetStateAction } from "react";
import CompanyRegistration from "../../components/CompanyRegistration";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer";
import { styles } from "./styles";

interface Props {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

const CompanyRegistrationPage: FC<Props> = ({
  isDark,
  setIsDark,
}): JSX.Element => {
  return (
    <div css={styles.registrationPage}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <CompanyRegistration />
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
};

export default CompanyRegistrationPage;
