/** @format */
/** @jsxImportSource @emotion/react */

import { FC, Dispatch, SetStateAction } from "react";
import Header from "../../components/Header/index";

import Footer from "../../components/Footer/index";
import Login from "../../components/Login/index";

import { styles } from "./styles";

interface IProps {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

const LoginPage: FC<IProps> = ({ isDark, setIsDark }): JSX.Element => {
  return (
    <div css={styles.loginPage}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Login />
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
};

export default LoginPage;
