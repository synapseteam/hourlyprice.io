/**
 * @format
 * @jsxImportSource @emotion/react
 */

import PropTypes from "prop-types";

import { styles } from "./styles";

export default function BaseInput({
	register,
	inputName,
	classname,
	width,
	readOnly,
	onChange,
	disabled,
	type,
}) {
	return (
		<input
			css={[styles.input, classname]}
			style={{ width: width + "px" }}
			{...register(inputName)}
			type={type}
			inputMode="decimal"
			autoComplete="off"
			readOnly={readOnly}
			onChange={onChange}
			disabled={disabled}
		/>
	);
}

BaseInput.propTypes = {
	register: PropTypes.func,
	inputName: PropTypes.string,
	width: PropTypes.string,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
	classname: PropTypes.any,
	disabled: PropTypes.bool,
	type: PropTypes.string,
};
