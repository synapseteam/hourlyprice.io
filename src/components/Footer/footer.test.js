import React from "react";
import renderer from "react-test-renderer";
import { AppThemeProvider } from "context/AppContext";

import Footer from "components/Footer/index.js";

if (!global.React) {
  global.React = React;
}

it("Footer rendered correctly with dark Theme", () => {
  const state = {
    darkMode: true,
  };
  const value = [state];
  const tree = renderer
    .create(
      <AppThemeProvider value={value}>
        <Footer
          companyName="Synapse Team LLC"
          companyUrl="https://synapseteam.com"
        />
      </AppThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Footer rendered correctly with light Theme", () => {
  const state = {
    darkMode: false,
  };
  const value = [state];
  const tree = renderer
    .create(
      <AppThemeProvider value={value}>
        <Footer
          companyName="Synapse Team LLC"
          companyUrl="https://synapseteam.com"
        />
      </AppThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
