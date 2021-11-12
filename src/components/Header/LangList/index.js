import React, { useState } from "react";
import uniqid from "uniqid";

import { changeLanguage } from "i18n";

import "components/Header/LangList/styles.scss";

export default function LangList() {
  const [isListShown, setisListShown] = useState(false);
  const [chosenLang, setChosenLang] = useState("EN");

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

  if (isListShown) {
    return (
      <div className="lang-list-container">
        <ul className="lang-list">
          {locales.map((el) => {
            return (
              <li className="lang-item" key={uniqid()}>
                <a href="/" onClick={langChangeHandler}>
                  {el.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="lang-list-container">
      <ul className="lang-list">
        <li className="lang-item" key={uniqid()}>
          <a href="/" onClick={langChangeHandler}>
            {chosenLang}
          </a>
        </li>
      </ul>
    </div>
  );
}
