import React from "react";
import renderer from "react-test-renderer";

import { AppThemeProvider } from "context/AppContext";
import Button from "components/UI/Button";

if (!global.React) {
  global.React = React;
}

test("Button rendered correctly, snapshot matched", () => {
  const context = {
    darkMode: true,
  };
  const value = [context];
  const tree = renderer
    .create(
      <AppThemeProvider value={value}>
        <Button />
      </AppThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
