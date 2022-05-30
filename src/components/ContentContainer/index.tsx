/** @jsxImportSource @emotion/react */

import { styles } from "./styles";

interface IProps {
  children: JSX.Element | JSX.Element[];
}
const ContentContainer: React.FC<IProps> = ({ children }) => {
  return <div css={styles.contentContainer}>{children}</div>;
};

export default ContentContainer;
