import React from "react";
import { Icon } from "@iconify/react";

import Logo from "components/Header/Logo";

import "components/Header/styles.scss";

export default function Header() {
  return (
    <header>
      <Logo />
      <Icon icon="ci:menu-duo" className="big-icon" />
    </header>
  );
}
