import { css } from "@emotion/react";

export const styles = {
  actOfWork: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
    align-self: stretch;
    font-size: 14px;
    line-height: 18px;
    height: 100%;
    width: 800px;
    margin: 50px auto;
    padding: 30px 80px;
  `,

  save: css`
    display: flex;
    width: 200px;
    margin-left: auto;
    input {
      border: 1px solid black;
      margin-right: 10px;
    }
  `,
  saveButton: css`
    padding: 0.3rem 0.5rem;
  `,
  saveButtonContainer: css`
    margin: 0;
  `,
  title: css`
    text-align: center;
    font-weight: bold;
    input {
      font-weight: bold;
    }
  `,

  subtitle: css`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `,
  details: css`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 4px;
    }
  `,
  textarea: css`
    resize: none;
    overflow: hidden;
    line-height: 12px;
    width: 100%;
    border: none;
    height: 100%;
  `,
  heading: css`
    text-align: center;
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    span {
      align-items: center;
      border: 1px solid black;
      justify-content: center;
    }
  `,
  column1: css`
    width: 30px;
  `,

  column2: css`
    min-width: 210px;
  `,
  column3: css`
    width: 100px;
  `,
  column4: css`
    width: 100px;
  `,
  column5: css`
    width: 100px;
  `,
  column6: css`
    width: 100px;
  `,
  fieldBold: css`
    font-weight: bold;
  `,
  total: css`
    span {
      justify-content: flex-end;
    }
  `,
  paragraphs: css`
    text-indent: 30px;
  `,
  info: css`
    display: flex;
    height: 300px;
    margin-top: 60px;
  `,
  infoTitleInput: css`
    margin: 15px 0px;
  `,
  item: css`
    display: flex;
    width: 50%;
    flex-direction: column;
  `,
  initials: css`
    margin-top: auto;
  `,
};
