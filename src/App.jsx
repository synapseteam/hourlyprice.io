/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { store } from "store";
import Header from "components/Header";
import HeroTitle from "components/HeroTitle";
import PriceForm from "components/PriceForm";
import Display from "components/Display";
import ContentContainer from "components/ContentContainer";
import Footer from "components/Footer";
import { themeDark, themeLight } from "theme";
import { styles } from "./styles";

const isDarkTheme = JSON.parse(localStorage.getItem("isDark"));

function App() {
  const [isDark, setIsDark] = useState(isDarkTheme);

  return (
    <div css={styles.app}>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? themeDark : themeLight}>
          <Header setIsDark={setIsDark} isDark={isDark} />

          <ContentContainer>
            <HeroTitle />
            <div css={styles.calculator}>
              <PriceForm />

              <Display />
            </div>
          </ContentContainer>

          <Footer
            companyName="Synapse Team LLC"
            companyUrl="https://synapseteam.com"
          />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
