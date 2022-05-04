import { css } from "@emotion/react";

export const styles = {
  actionPanel: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 40px;
  `,
  invoice: css`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 18px;
    height: 100%;
    width: 100%;
  `,
  invoiceHeadingRow: css`
    padding: 0;
  `,
  row: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
  `,
  column: css`
    display: flex;
    flex-direction: column;
    width: 50%;
  `,
  agreementColumn: css`
    display: flex;
    align-items: flex-end;
    width: 55%;
  `,
  text: css`
    font-size: 14px;
    line-height: 24px;
    color: #212121;
  `,
  column1: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
  `,
  column2: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    width: 36%;
  `,
  column3: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 10%;
  `,
  logo: css`
    height: 60px;
    width: 60px;
    img {
      height: 100%;
    }
  `,
  logoEdit: css`
    &:hover {
      cursor: pointer;
    }
  `,
  title: css`
    input {
      text-align: right;
      font-size: 24px;
      line-height: 28px;
      font-weight: bold;
      margin: 0;
      color: #000;
    }
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
  heading: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    width: 100%;
    background: #424242;
    color: #fff;

    span {
      align-items: center;
      justify-content: flex-start;
    }
  `,
  transferDetails: css`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    padding-bottom: 40px;
  `,
  generalInfoColumn: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  generalInfoColumnNoEdit: css`
    border-top: 1px solid #bfbfbf;
  `,
  generalInfo: css`
    display: flex;
    align-items: center;
    height: 30px;
    span {
      font-weight: bold;
    }
  `,
  headingRow: css`
    padding: 0;
    span {
      justify-content: flex-start;
    }
  `,
  headingColumn1: css`
    width: 25px;
  `,
  headingColumn: css`
    input {
      width: 100%;
    }
  `,
  headingColumn2: css`
    width: 340px;
    min-width: 210px;
  `,
  headingColumn3: css`
    width: 80px;
  `,
  headingColumn4: css`
    width: 80px;
  `,
  headingColumn5: css`
    width: 80px;
  `,
  field: css`
    border: none;
    margin: 1px;
    background: #fff;
    min-width: 28px;
    line-height: 24px;

    &:disabled {
      border: none;
    }
  `,
  textarea: css`
    resize: none;
    overflow: hidden;
    min-height: 180px;
    line-height: 24px;
    width: 100%;
    height: 97px;
  `,
  notesTextArea: css`
    min-height: 40px;
  `,
  smallField: css`
    width: 30px;
  `,
  fieldBold: css`
    font-weight: bold;
  `,
  fieldDate: css`
    line-height: 20px;
    text-align: right;
  `,

  mediumField: css`
    width: 77px;
  `,
  bigField: css`
    width: 300px;
    text-align: right;
  `,
  agreementNumber: css`
    margin-bottom: 1px;
  `,
  serviceInput: css`
    word-wrap: break-word;
    word-break: break-all;
    height: 30px;
    width: 100%;
    padding: 4px 0;
    resize: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  serviceCurrency: css`
    padding: 0px 0px 0px 0px !important;
  `,
  balanceDue: css`
    input {
      text-align: right;
    }
  `,
  balanceDueTotal: css`
    font-weight: bold;
    background-color: #f5f4f2;
    padding: 10px 4px 10px 50px;
    input {
      text-align: right;
    }
  `,
  bigTextarea: css`
    min-height: 150px;
  `,
  button: css`
    background-color: #24274a;
    border: 1px solid #171d3d;
    border-radius: 2px;
    color: #fff;
    height: 30px;
    width: 80px;
    cursor: pointer;
  `,
  addButton: css`
    background-color: #24274a;
    border: 1px solid #171d3d;
    border-radius: 2px;
    color: #fff;
    height: 30px;
    cursor: pointer;
    width: 100%;
    &:disabled {
      background: #4e7585;
      border: 1px solid #4e7585;
      cursor: not-allowed;
    }
  `,
};
