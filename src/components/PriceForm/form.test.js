/**
 * @jest-environment jsdom
 */

import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { AppThemeProvider } from "context/AppContext";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import thunkMiddleware from "redux-thunk";

import PriceForm from "components/PriceForm";

if (!global.React) {
  global.React = React;
}

const mockStore = configureStore([thunkMiddleware]);
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

const setup = () => {
  const { container } = render(
    <AppThemeProvider value={value}>
      <Provider store={store}>
        <PriceForm />
      </Provider>
    </AppThemeProvider>
  );

  const form = container.querySelector("form");

  const allLabels = form.querySelectorAll("label");

  const allLabelsTexts = [...allLabels].map((label) => label.textContent);

  let priceInput = screen.getByRole("textbox", {
    name: /price:/i,
  });

  const timeInput = screen.getByRole("textbox", {
    name: /time:/i,
  });

  const currencyInput = screen.getByRole("combobox", {
    name: /currency:/i,
  });

  const rateSource = screen.getByRole("combobox", {
    name: /exchange rate:/i,
  });

  return {
    form,
    allLabelsTexts,
    priceInput,
    timeInput,
    currencyInput,
    rateSource,
  };
};

test("Form component snapshot test", () => {
  const tree = renderer
    .create(
      <AppThemeProvider value={value}>
        <Provider store={store}>
          <PriceForm />
        </Provider>
      </AppThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Form component: user submit empty form", async () => {
  const { form, allLabelsTexts } = setup();

  expect(allLabelsTexts.length).toBe(4);

  await waitFor(() => {
    fireEvent.submit(form);
  });
  let allErrors = [...form.querySelectorAll(".input__error")];

  let allErrorsTexts = allErrors.map((err) => err.textContent);

  expect(allErrorsTexts.length).toBe(2);
});

test("Uset fullfill form, submit it and there is no errors to be displayed. Fields keep same value as before form was submitted", async () => {
  const { form, priceInput, timeInput, currencyInput, rateSource } = setup();

  userEvent.type(priceInput, "20");
  userEvent.type(timeInput, "30:30");
  userEvent.selectOptions(currencyInput, ["USD"]);
  userEvent.selectOptions(rateSource, ["Manual"]);

  await waitFor(() => {
    fireEvent.submit(form);
  });

  let allErrors = [...form.querySelectorAll(".input__error")];

  let allErrorsTexts = allErrors.map((err) => err.textContent);

  expect(allErrorsTexts.length).toBe(0);
  expect(priceInput.value).toBe("20");
  expect(timeInput.value).toBe("30:30");
  expect(currencyInput.value).toBe("USD");
  expect(rateSource.value).toBe("Manual");
});
