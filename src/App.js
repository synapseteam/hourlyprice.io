import { Provider } from "react-redux";

import { store } from "store";
import Header from "components/Header";
import HeroTitle from "components/HeroTitle";
import PriceForm from "components/PriceForm";
import Display from "components/Display";
import Button from "components/UI/Button";
import Footer from "components/Footer";
import { useAppThemeContext } from "context/AppContext";

import "App.scss";

function App() {
  const [context] = useAppThemeContext();

  return (
    <div className={context.darkMode ? "App" : "App App_light"}>
      <Provider store={store}>
        <Header />

        <div className="content-container">
          <HeroTitle />
          <PriceForm id="calc-form">
            <Display />
            <Button formId="calc-form" />
          </PriceForm>
        </div>
        <Footer
          companyName="Synapse Team LLC"
          companyUrl="https://synapseteam.com"
        />
      </Provider>
    </div>
  );
}

export default App;
