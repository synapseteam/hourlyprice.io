import React from "react";

import "components/shared/Loader/styles.scss";

export default function Loader() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
