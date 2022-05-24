import { css } from "@emotion/react";

export const styles = {
  ActOfWorkDoc: css`
    position: relative;
    @media (max-width: 820px) {
      display: none;
    }

    margin: 0 auto;
  `,
  actOfWork: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
    align-self: stretch;
    font-size: 14px;
    line-height: 18px;
    width: 800px;
    margin: 15px auto 50px;
    padding: 30px 80px 150px;

    &:hover [data-comp="hover"] {
      background-color: #dfdfdf;
      transition: 0.3s;
      input {
        background-color: #dfdfdf;
        transition: 0.3s;
      }
    }
    [data-comp="hover"] {
      transition: 0.3s;
      &:hover {
        cursor: pointer;
      }
      input {
        transition: 0.3s;
      }
    }
    @media (max-width: 820px) {
      display: none;
    }
  `,

  save: (theme) => css`
    background-color: ${theme.primary};
    display: flex;
    justify-content: space-between;
    margin: 15px auto;
    padding: 10px 30px;
    width: 800px;
    background-color: input {
      border: 1px solid black;
      margin-right: 10px;
    }
  `,
  saveInput: (theme) => css`
    border-bottom: 1px solid ${theme.senary};
    background: none;
    color: ${theme.senary};
    font-size: 24px;
  `,
  editInput: (theme) => css`
    display: flex;
    border: 1px solid black;
    background: #f6f6f6;
    color: ${theme.senary};
    z-index: 5;
    input {
      background: #f6f6f6;
      &:hover [data-comp="hover"] {
        background-color: #dfdfdf;
        transition: 0.3s;
      }
    }
    :hover [data-comp="hover"] {
      background-color: #dfdfdf;
      transition: 0.3s;
    }
  `,
  editButton: css`
    width: 25px;
    height: 25px;
    margin: 2px;
    padding: 1px;
    border-radius: 0;
  `,
  editButtonContainer: css`
    margin: 0px;
  `,
  buttons: css`
    display: flex;
    div:not(:last-of-type) {
      margin-right: 10px;
    }
  `,
  saveButton: css`
    width: 130px;
    padding: 0.5rem 0.7rem;
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
      text
    }
    input{
      text-align:center;
    }
  `,

  paragraphs: css`
    margin-top: 15px;
  `,
  indent: css`
    text-indent: 50px;
  `,
  textarea: css`
    resize: none;
    overflow: hidden;
    line-height: 18px;
    width: 100%;
    border: none;
  `,
  textareaSmall: css`
    resize: none;
    overflow: hidden;
    line-height: 12px;
    width: 100%;
    border: none;
    height: 100%;
  `,
  noEditTitle: css`
    font-size: 12px;
  `,
  heading: css`
    position: relative;
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
    width: 230px;
  `,
  column3: css`
    width: 95px;
  `,
  column4: css`
    width: 95px;
  `,
  column5: css`
    width: 95px;
  `,
  column6: css`
    width: 95px;
  `,
  removeButton: css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(30px, -50%);
    cursor: pointer;
  `,
  addButtonContainer: css`
    margin: 0;
  `,
  addButton: css`
    background-color: #f1f3f4;
    color: black;
    border-radius: 0;
  `,
  fieldBold: css`
    font-weight: bold;
  `,

  total: css`
    span {
      justify-content: flex-end;
    }
    input {
      text-align: center;
    }
  `,

  info: css`
    display: flex;
    height: 350px;
    margin-top: 60px;
    justify-content: space-between;
  `,
  infoField: css`
    display: flex;
    width: 95%;
    white-space: nowrap;
    input {
      width: 100%;
    }
  `,
  infoFieldNoEdit: css`
    white-space: normal;
  `,
  infoAddressField: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  infoTitleInput: css`
    margin: 15px 0px;
  `,
  item: css`
    display: flex;
    width: 49%;

    flex-direction: column;
    line-height: 20px;
    span {
      padding-bottom: 3px;
    }
  `,

  initials: css`
    margin-top: auto;
  `,
};
