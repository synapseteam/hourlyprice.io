import React from "react";

import "components/Header/Logo/styles.scss";
import { useAppThemeContext } from "context/AppContext";

export default function Logo({ logoText }) {
  const [context] = useAppThemeContext();
  return (
    <>
      <p className={context.darkMode ? "logo" : "logo logo_light"}>
        hourlyprice.io
      </p>
    </>
  );
}
