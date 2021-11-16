import React, { useState } from "react";
import uniqid from "uniqid";
import { changeLanguage } from "i18n";

import { useAppThemeContext } from "context/AppContext";

import "components/Header/LangList/styles.scss";

export default function LangList() {
  const [isListShown, setisListShown] = useState(false);
  const [chosenLang, setChosenLang] = useState("EN");

  const [context] = useAppThemeContext();

  const langChangeHandler = (e) => {
    e.preventDefault();

    if (!isListShown) {
      setisListShown((prev) => true);
    }

    if (isListShown) {
      const value = e.target.innerText.toLowerCase();
      changeLanguage(value);
      setisListShown((prev) => false);
      setChosenLang((prev) => value.toUpperCase());
    }
  };

  const locales = ["en", "ru", "ua"];

  return (
    <div
      className={
        context.darkMode
          ? "lang-list-container"
          : "lang-list-container light-lang-list-container"
      }
    >
      <ul className="lang-list">
        {isListShown ? (
          locales.map((el) => {
            return (
              <li className="lang-item" key={uniqid()}>
                <a href="/" onClick={langChangeHandler}>
                  {el.toUpperCase()}
                </a>
              </li>
            );
          })
        ) : (
          <li className="lang-item">
            <a href="/" onClick={langChangeHandler}>
              {chosenLang}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
