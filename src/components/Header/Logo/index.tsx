/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/urls";

import { styles } from "./styles";

interface IProps {
  logoText?: string;
}

const Logo: React.FC<IProps> = ({
  logoText = "hourlyprice.io",
}): JSX.Element => {
  return (
    <Link to={ROUTES.home} css={styles.logo}>
      {logoText}
    </Link>
  );
};

export default Logo;
