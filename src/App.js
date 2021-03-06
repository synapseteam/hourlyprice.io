/** @jsxImportSource @emotion/react */
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";

import { store } from "store";
import Header from "components/Header";
import HeroTitle from "components/HeroTitle";
import PriceForm from "components/PriceForm";
import Display from "components/Display";
import ContentContainer from "components/ContentContainer";
import Footer from "components/Footer";

import { themeDark, themeLight } from "theme/index";
import { styles } from "./styles";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div css={styles.app}>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? themeDark : themeLight}>
          <Header setIsDark={setIsDark} />

          <ContentContainer>
            <HeroTitle />
            <Display />
            <PriceForm />
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
