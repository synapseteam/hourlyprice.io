/** @jsxImportSource @emotion/react */
import { Provider } from "react-redux";

import { store } from "store";
import Header from "components/Header";
import HeroTitle from "components/HeroTitle";
import PriceForm from "components/PriceForm";
import Display from "components/Display";
import ContentContainer from "components/ContentContainer";
import Footer from "components/Footer";
import { useAppThemeContext } from "context/AppContext";

import { styles } from "./styles";

function App() {
  const [{ darkMode }] = useAppThemeContext();

  return (
    <div css={() => styles.getStyle(darkMode, "app")}>
      <Provider store={store}>
        <Header />

        <ContentContainer>
          <HeroTitle />
          <Display />
          <PriceForm />
        </ContentContainer>

        <Footer
          companyName="Synapse Team LLC"
          companyUrl="https://synapseteam.com"
        />
      </Provider>
    </div>
  );
}

export default App;
