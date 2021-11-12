import { createContext, useReducer, useContext } from "react";

const AppThemeContext = createContext();

const initState = {
  darkMode: true,
};

const TOGGLE_THEME = "TOGGLE_THEME";

function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      throw Error("impossible case while switching Theme");
  }
}

export const AppThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = [state, dispatch];

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppThemeContext = () => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw Error("useAppThemeContext should be used within AppThemeProvider");
  }

  return context;
};

export const toggleTheme = () => {
  return { type: TOGGLE_THEME, payload: null };
};

export default AppThemeContext;
