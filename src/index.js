import React from "react";
import ReactDOM from "react-dom";

import App from "App";
import { AppThemeProvider } from "context/AppContext";

import "index.scss";

ReactDOM.render(
  <AppThemeProvider>
    <App />
  </AppThemeProvider>,
  document.getElementById("root")
);
