/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { store } from "store";

import HomePage from "pages/HomePage/index";
import ActOfWorkPage from "pages/ActOfWork/index";
import BillPage from "pages/Bill/index";
import { themeDark, themeLight } from "theme";
import { ROUTES } from "./utils/urls";
import { styles } from "./styles";

function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const isDarkTheme = JSON.parse(localStorage.getItem("isDark"));
    isDarkTheme !== null ? setIsDark(isDarkTheme) : setIsDark(true);
  }, []);

  return (
    <div css={styles.app}>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? themeDark : themeLight}>
          <Routes>
            <Route
              path={ROUTES.home}
              element={<HomePage isDark={isDark} setIsDark={setIsDark} />}
            />
            <Route
              path={ROUTES.actOfWork}
              element={<ActOfWorkPage isDark={isDark} setIsDark={setIsDark} />}
            />
            <Route
              path={ROUTES.bill}
              element={<BillPage isDark={isDark} setIsDark={setIsDark} />}
            />
          </Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
