import React from "react";

import "components/Header/Logo/styles.scss";

export default function Logo({ logoText }) {
  return (
    <div className="logo-container">
      <p className="logo">hourlyprice.io</p>
    </div>
  );
}
