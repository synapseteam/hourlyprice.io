/**
 * @format
 * @jsxImportSource @emotion/react
 */

import PropTypes from "prop-types";
import { styles } from "./styles";

export default function TextArea({
	register,
	inputName,
	classname,
	width,
	height,
	disabled,
}) {
	return (
		<textarea
			css={[styles.textArea, classname]}
			style={{
				width: width + "px",
				height: height + "px",
				resize: "none",
			}}
			{...register(inputName)}
			inputMode="decimal"
			autoComplete="off"
			disabled={disabled}
		/>
	);
}

TextArea.propTypes = {
	register: PropTypes.func,
	inputName: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	classname: PropTypes.any,
	disabled: PropTypes.bool,
};
