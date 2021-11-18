import { Provider } from "react-redux";

import { store } from "store";
import Header from "components/Header";
import HeroTitle from "components/HeroTitle";
import Form from "components/Form";
import Display from "components/Display";
import Button from "components/shared/Button";
import ContentColumn from "components/ContentColumn";
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
          <div className="content-container__columns">
            <ContentColumn>
              <Form id="calc-form" />
            </ContentColumn>

            <ContentColumn>
              <Display />
              <Button formId="calc-form" />
            </ContentColumn>
          </div>
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
