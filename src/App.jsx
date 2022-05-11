/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import { store } from "./store/index";

import HomePage from "./pages/Home/index";
import LoginPage from "./pages/Login/index";
import RegistrationPage from "./pages/Registration/index";
import ActOfWorkPage from "./pages/ActOfWork/index";
import BillPage from "./pages/Bill/index";
import { themeDark, themeLight } from "theme";
import { ROUTES } from "./utils/urls";
import "react-toastify/dist/ReactToastify.css";
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
          <ToastContainer
            draggable={false}
            autoClose={5000}
            position="top-right"
            pauseOnHover={false}
            hideProgressBar
            theme={isDark ? "dark" : "light"}
          />
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
            <Route
              path={ROUTES.login}
              element={<LoginPage isDark={isDark} setIsDark={setIsDark} />}
            />
            <Route
              path={ROUTES.registration}
              element={
                <RegistrationPage isDark={isDark} setIsDark={setIsDark} />
              }
            />
          </Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
