/** @jsxImportSource @emotion/react */
import { styles } from "./styles";

interface IProps {
  companyName: string;
  companyUrl: string;
}
const Footer: React.FC<IProps> = ({
  companyName = "Synapse Team LLC",
  companyUrl = "https://synapseteam.com",
}): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer css={styles.footer}>
      <p css={styles.footerText}>
        <a
          css={styles.footerLink}
          href={companyUrl}
          target="_blank"
          rel="noreferrer"
        >{`© ${companyName}, ${currentYear}`}</a>
      </p>
    </footer>
  );
};

export default Footer;
