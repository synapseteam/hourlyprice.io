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
          ? "lang-container"
          : "lang-container lang-container_light"
      }
    >
      <ul className="lang-container__list">
        {isListShown ? (
          locales.map((el) => {
            return (
              <li className="lang-container__item" key={uniqid()}>
                <a
                  className="lang-container__link"
                  href="/"
                  onClick={langChangeHandler}
                >
                  {el.toUpperCase()}
                </a>
              </li>
            );
          })
        ) : (
          <li className="lang-container__item">
            <a
              className="lang-container__link"
              href="/"
              onClick={langChangeHandler}
            >
              {chosenLang}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
