/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { store } from "store";

import HomePage from "pages/HomePage/index";
import { themeDark, themeLight } from "theme";
import { ROUTES } from "./utils/urls";
import { styles } from "./styles";

const isDarkTheme = JSON.parse(localStorage.getItem("isDark"));

function App() {
  const [isDark, setIsDark] = useState(isDarkTheme);

  return (
    <div css={styles.app}>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? themeDark : themeLight}>
          <Routes>
            <Route
              path={ROUTES.home}
              element={<HomePage isDark={isDark} setIsDark={setIsDark} />}
            />
          </Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
