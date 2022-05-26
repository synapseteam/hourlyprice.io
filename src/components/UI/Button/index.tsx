/** @jsxImportSource @emotion/react */
import { SerializedStyles, Theme } from "@emotion/react";
import { styles } from "./styles";

interface Props {
  type?: "button" | "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: string | JSX.Element[] | JSX.Element;
  disabled?: boolean;
  classname?: SerializedStyles;
  classnameContainer?: SerializedStyles;
  form?: string;
  dataTip?: string;
}

const Button: React.FC<Props> = ({
  type = "button",
  onClick,
  children,
  disabled = false,
  classname,
  classnameContainer,
  form,
  dataTip,
}) => {
  return (
    <div css={[styles.buttonContainer, classnameContainer]}>
      <button
        css={[styles.button, classname]}
        type={type}
        color="red"
        onClick={onClick}
        disabled={disabled}
        form={form}
        data-tip={dataTip}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
