/** @jsxImportSource @emotion/react */
import { useState } from "react";
import uniqid from "uniqid";
import { changeLanguage } from "i18n";

import { styles } from "./styles";

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

  return (
    <div css={styles.langContainer}>
      <ul css={styles.langList}>
        {isListShown ? (
          locales.map((el) => {
            return (
              <li css={styles.langListItem} key={uniqid()}>
                <a
                  css={styles.langListLink}
                  href="/"
                  onClick={langChangeHandler}
                >
                  {el.toUpperCase()}
                </a>
              </li>
            );
          })
        ) : (
          <li css={styles.langListItem}>
            <a css={styles.langListLink} href="/" onClick={langChangeHandler}>
              {chosenLang}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
