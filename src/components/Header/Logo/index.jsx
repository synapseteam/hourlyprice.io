import React from "react";

import "components/Header/Logo/styles.scss";
import { useAppThemeContext } from "context/AppContext";

export default function Logo({ logoText }) {
  const [context] = useAppThemeContext();
  return (
    <div
      className={
        context.darkMode ? "logo-container" : "logo-container light-logo"
      }
    >
      <p className="logo">hourlyprice.io</p>
    </div>
  );
}
