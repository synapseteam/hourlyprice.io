import { Provider } from "react-redux";

import { store } from "store";
import Header from "components/Header";
import HeroTitle from "components/HeroTitle";
import Form from "components/Form";
import Display from "components/Display";
import ButtonSubmit from "components/ButtonSubmit";
import ContentColumn from "components/ContentColumn";
import Footer from "components/Footer";

import "App.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />

        <div className="content-container">
          <HeroTitle />
          <div className="content-columns-container">
            <ContentColumn>
              <Form />
            </ContentColumn>

            <ContentColumn>
              <Display />
              <ButtonSubmit />
            </ContentColumn>
          </div>
        </div>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
