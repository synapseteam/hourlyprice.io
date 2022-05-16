/** @jsxImportSource @emotion/react */
import { SerializedStyles, Theme } from "@emotion/react";
import { styles } from "./styles";

interface Props {
  type?: "button" | "reset" | "submit";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element[] | JSX.Element | string;
  disabled?: boolean;
  classname?: SerializedStyles;
  classnameContainer?: SerializedStyles;
  form?: string;
}

const Button: React.FC<Props> = ({
  type = "button",
  onClick,
  children,
  disabled = false,
  classname,
  classnameContainer,
  form,
}): JSX.Element => {
  return (
    <div css={[styles.buttonContainer, classnameContainer]}>
      <button
        css={[styles.button, classname]}
        type={type}
        color="red"
        onClick={onClick}
        disabled={disabled}
        form={form}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
