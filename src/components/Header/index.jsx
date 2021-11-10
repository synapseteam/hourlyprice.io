import React from "react";
import { Icon } from "@iconify/react";

import "components/Header/styles.scss";

export default function Header() {
  return (
    <header>
      <Icon icon="ci:menu-duo" className="big-icon" />
    </header>
  );
}
