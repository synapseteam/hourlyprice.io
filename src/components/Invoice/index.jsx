/** @jsxImportSource @emotion/react */
import Logo from "../../assets/ukraine-heart.png";
import { styles } from "./styles";

export const Invoice = () => (
  <div css={styles.invoice}>
    <div css={[styles.row, styles.invoiceHeadingRow]}>
      <div css={styles.logo}>
        <img src={Logo} alt={"Ukraine"} />
      </div>
      <div css={styles.title}>Invoice</div>
    </div>
    <div css={styles.row}>
      <div css={styles.column}>
        <span css={styles.text}>
          <strong>Synapse Team LLC</strong>
        </span>
        <span css={styles.text}>USREOU Code: 42772269</span>
        <span css={styles.text}>Ukraine, Zaporizhzhia</span>
        <span css={styles.text}>email@test.com</span>
      </div>
      <div css={[styles.column, styles.agreementColumn]}>
        <span css={styles.text}>
          <strong># INV-001 to the Agreement 777</strong>
        </span>
        <span css={styles.text}>&nbsp;</span>
        <span css={styles.text}>
          <strong>Balance Due</strong>
        </span>
        <span css={styles.text}>some value</span>
      </div>
    </div>
    <div css={styles.row}>
      <div css={styles.column1}>
        <span css={styles.text}>
          <strong>Bill To</strong>
        </span>
        <div css={styles.column}>
          <span css={styles.text}>column 1</span>
          <span css={styles.text}>column 2</span>
          <span css={styles.text}>column 3</span>
        </div>
      </div>
      <div css={styles.column2}>
        <span css={styles.text}>&nbsp;</span>
        <span css={styles.text}>
          <strong>Invoice Date:</strong>
        </span>
        <span css={styles.text}>
          <strong>Due Date:</strong>
        </span>
      </div>
      <div css={styles.column3}>
        <span css={styles.text}>&nbsp;</span>
        <span css={styles.text}>01 Apr 2022</span>
        <span css={styles.text}>15 Apr 2022</span>
      </div>
    </div>
    <div css={styles.details}>
      <div css={styles.heading}>
        <span css={styles.headingColumn1}>#</span>
        <span css={styles.headingColumn2}>Item & Description</span>
        <span css={styles.headingColumn3}>Qty</span>
        <span css={styles.headingColumn4}>Rate</span>
        <span css={styles.headingColumn5}>Amount</span>
      </div>
      <div css={[styles.row, styles.headingRow]}>
        <span css={styles.headingColumn1}>1</span>
        <span css={styles.headingColumn2}>
          Web Development Service: Some Description
        </span>
        <span css={styles.headingColumn3}>10</span>
        <span css={styles.headingColumn4}>100</span>
        <span css={styles.headingColumn5}>1000</span>
      </div>
      <div css={styles.generalInfoColumn}>
        <div css={styles.generalInfo}>
          <strong>Sub Total:</strong>
          <span>$100</span>
        </div>
        <div css={styles.generalInfo}>
          <strong>Total:</strong>
          <span>$100</span>
        </div>
        <div css={styles.generalInfo}>
          <strong>Balance Due:</strong>
          <span>$100</span>
        </div>
      </div>
    </div>
    <div css={styles.transferDetails}>
      <span css={styles.text}>
        <strong>Notes</strong>
      </span>
      <span css={styles.text}>Thanks for your business</span>
      <br />
      <span css={styles.text}>
        <strong>Wire Transfer Details:</strong>
      </span>
      <span css={styles.text}>Lorem Ipsum is simply dummy text</span>
      <span css={styles.text}>
        Lorem Ipsum is simply dummy text of the printing.
      </span>
      <span css={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </span>
      <span css={styles.text}>Lorem Ipsum is simply.</span>
      <span css={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
      </span>
      <br />
      <span css={styles.text}>
        Lorem Ipsum is simply dummy text of the printing.
      </span>
      <span css={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </span>
      <span css={styles.text}>Lorem Ipsum is simply.</span>
      <span css={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
      </span>
    </div>
  </div>
);

export default Invoice;
