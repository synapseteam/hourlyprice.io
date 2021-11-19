/**
 * @jest-environment jsdom
 */

import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { AppThemeProvider } from "context/AppContext";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import Form from "components/Form";

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

test("Form component snapshot test", () => {
  const tree = renderer
    .create(
      <AppThemeProvider value={value}>
        <Provider store={store}>
          <Form />
        </Provider>
      </AppThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Form component: user submit empty form", async () => {
  const { container } = render(
    <AppThemeProvider value={value}>
      <Provider store={store}>
        <Form />
      </Provider>
    </AppThemeProvider>
  );

  const form = container.querySelector("form");
  const allLabels = form.querySelectorAll("label");

  const allLabelsTexts = [...allLabels].map((label) => label.textContent);

  expect(allLabelsTexts.length).toBe(4);

  await waitFor(() => {
    fireEvent.submit(form);
  });
  let allErrors = [...form.querySelectorAll(".input__error")];

  let allErrorsTexts = allErrors.map((err) => err.textContent);

  expect(allErrorsTexts.length).toBe(2);
});
