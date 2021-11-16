import React from "react";
import renderer from "react-test-renderer";
import { AppThemeProvider } from "context/AppContext";

import Footer from "components/Footer/index.js";

if (!global.React) {
  global.React = React;
}

it("Footer rendered correctly with dark Theme", () => {
  const context = {
    darkMode: true,
  };
  const value = [context];
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
