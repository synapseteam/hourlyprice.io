import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
    septenary: string;
    octonary: string;
    nonary: string;
    denary: string;
    modalOverlay: string;

    btnHoverColor: string;
    btnDisabledColor: string;
    btnDisabledBgColor: string;
    labelColor: string;
    linkColor: string;
    inputBackgroundColor: string;
    inputBgColor: string;
    skeletonBg: string;
    skeletonFg: string;

    shadow: string;
    footerBorderTop: string;
    footerShadow: string;
    headerShadow: string;
    langListBorder: string;
    btnBorder: string;
    inputBorder: string;
  }
}
