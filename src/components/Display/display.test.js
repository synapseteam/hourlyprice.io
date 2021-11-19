import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { AppThemeProvider } from "context/AppContext";

import Display from "components/Display";

if (!global.React) {
  global.React = React;
}

const mockStore = configureStore();
const initState = {
  main: {
    fields: {
      price: "",
      time: "",
      currency: "USD",
    },
  },
  rates: {
    allCurrencies: [
      { name: "USD", rate: 1, symbol: "$", isoCode: "840" },
      { name: "EUR", rate: 1, symbol: "€", isoCode: "978" },
      { name: "UAH", rate: 1, symbol: "₴", isoCode: "980" },
      { name: "RUB", rate: 1, symbol: "₽", isoCode: "810" },
    ],
    updatedAt: "",
    ratesSource: "MasterCard",
  },
};

const context = {
  darkMode: true,
};
const value = [context];

const store = mockStore(initState);

test("Display component snapshot test", () => {
  const tree = renderer
    .create(
      <AppThemeProvider value={value}>
        <Provider store={store}>
          <Display />
        </Provider>
      </AppThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
