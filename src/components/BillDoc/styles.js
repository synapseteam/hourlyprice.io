/** @format */

import { css } from "@emotion/react";

export const styles = {
	billDoc: css`
		display: flex;
		flex-direction: column;
		background-color: white;
		color: black;
		font-size: 14px;
		line-height: 18px;
		height: 100%;
		width: 800px;
		margin: 50px auto;
		padding: 80px 50px;
	`,

	title: css`
		font-weight: bold;
		font-size: 18px;
		border-bottom: 1.5px solid black;
		margin-bottom: 20px;
	`,

	titleFieldBold: css`
		font-weight: bold;
		font-size: 18px;
	`,

	fieldBold: css`
		font-weight: bold;
	`,

	infoContainer: css`
		display: flex;
		flex-direction: column;
	`,

	info: css`
		display: flex;
		margin-top: 10px;
	`,
	infoTitle: css`
		font-weight: bold;
		margin-right: 20px;
		flex: 0 0 15%;
	`,
	infoContent: css`
		display: flex;
		flex-direction: column;
	`,
	infoTitleInput: css`
		margin-bottom: 10px;
	`,

	basis: css`
		display: flex;
		flex-direction: column;
	`,

	details: css`
		display: grid;
		grid-template-columns: 10% 32% 15% 15% 13% 15%;
		border: 1px solid black;
		grid-gap: 1px;
		background-color: black;
		position: relative;

		div {
			padding: 10px;
			background-color: white;
		}
	`,

	total: css`
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-top: 10px;
		margin-right: 10px;
		line-height: 20px;
	`,

	totalColumn: css`
		font-weight: bold;
		margin-right: 50px;
	`,

	totalText: css`
		margin-top: 15px;
		font-weight: bold;
		border-bottom: 1.5px solid black;
	`,

	billAuthor: css`
		margin-top: 20px;
		font-weight: bold;
	`,

	billAuthorTitle: css`
		margin-bottom: 15px;
	`,

	save: css`
		display: flex;
		justify-content: space-between;
		margin: 50px auto;
		width: 800px;
		align-items: center;

		input {
			border: 1px solid black;
			margin-right: 10px;
			border-radius: 5px;
			padding: 10px;
		}
	`,
	saveButton: css`
		padding: 10px;
	`,
	saveButtonContainer: css`
		margin: 0;
	`,
	saveButtons: css`
		display: flex;
	`,
	exportButton: css`
		min-width: 200px;
		margin: 0 10px;
	`,

	detailsRemoveBtn: css`
		position: absolute;
		right: -30px;
		top: 25%;
	`,
};
