/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import { styles } from "./styles";

export default function Button({
  type = "button",
  onClick,
  children,
  disabled,
}) {
  return (
    <div css={styles.buttonContainer}>
      <button
        css={styles.button}
        type={type}
        color="red"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  formId: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
