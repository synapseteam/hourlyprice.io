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
    width: 100%;
    padding: 20px 40px;
    p {
      text-indent: 30px;
    }
  `,
  subtitle: css`
    display: flex;
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
    height: 50px;
    width: 100%;

    span {
      align-items: center;
      border: 1px solid black;
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
    min-width: 210px;
  `,
  headingColumn3: css`
    width: 100px;
  `,
  headingColumn4: css`
    width: 100px;
  `,
  headingColumn5: css`
    width: 100px;
  `,
};
