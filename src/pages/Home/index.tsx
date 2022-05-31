/**
 * @format
 * @jsxImportSource @emotion/react
 */
import { FC, Dispatch, SetStateAction } from "react";
import Header from "../../components/Header/index";
import HeroTitle from "../../components/HeroTitle";
import PriceForm from "../../components/PriceForm";
import Display from "../../components/Display";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import { styles } from "./styles";

interface IProps {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

const HomePage: FC<IProps> = ({ isDark, setIsDark }): JSX.Element => {
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
};

export default HomePage;
