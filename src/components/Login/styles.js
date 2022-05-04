/** @format */

import { css } from "@emotion/react";

export const styles = {
	form: css`
		margin-top: 0.2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;

		> * {
			margin-top: 0.8rem;
		}
		&:first-of-type {
			margin-top: 0rem;
		}

		@media (min-width: 720px) {
			width: 47%;
		}
	`,
	formInputError: css`
		border-color: red !important;
	`,
	formError: css`
		color: red;
		font-size: 16px;
		margin-top: 5px;
		margin-bottom: 10px;
	`,
};
