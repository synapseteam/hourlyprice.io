/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import JsPDF from "jspdf";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import BaseInput from "../UI/Input";
import { styles } from "./styles";
import BaseDatePicker from "../UI/DatePicker";
import Button from "../UI/Button";
import PropTypes from "prop-types";
import TextAria from "../UI/TextAria";

export default function BillDoc({ selectedBill, setBillItems }) {
	const now = new Date();
	const [orderTotal, setOrderTotal] = useState(0);

	console.log(convertStrTimeToNum("10:00:00"));

	useEffect(() => {
		selectedBill && reset(selectedBill);
	}, [selectedBill]);

	const defaultValues = {
		docName: "test1",
		billNumber: "XXXXXX",
		billDateFrom: now,
		billDate: now,
		billAuthor: "XXX XXXXXXXX XXXXXXXXX",
		details: [
			{
				title: "XXX XXXXXXXX XXXXXXXXX",
				price: 100.0,
				quantity: "10:00:00",
				sum: 1000.0,
			},
		],
		total: "Одна тисяча",
		totalCents: "00",
		info: {
			provider: {
				title: "XXX XXXXXXXX XXXXXXXXX",
				textField:
					"XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX",
			},
			buyer: {
				textField: "XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX",
			},
		},
	};
	const { register, handleSubmit, reset, getValues, setValue, control } =
		useForm({
			defaultValues: selectedBill ? selectedBill : defaultValues,
		});

	const { remove, append } = useFieldArray({
		name: "details",
		control,
	});

	const formValues = getValues();
	console.log(formValues);

	const calculateOrderTotal = () => {
		if (formValues && formValues.details) {
			const total = formValues.details.reduce(
				(acc, curr) => Number(curr.total) + acc,
				0
			);
			console.log(total, "total");
			setOrderTotal(total);
		}
	};

	useEffect(() => {
		calculateOrderTotal();
	}, [formValues.details]);

	// const watchTotal = watch("details.sum");
	console.log(orderTotal.toFixed);

	const generatePDF = () => {
		const report = new JsPDF("p", "px", [936, 1300]);
		report.viewerPreferences({ CenterWindow: true }, true);
		report
			.html(document.querySelector("#billDoc"), { margin: [20, 10, 10, 50] })
			.then(() => {
				report.save("bill.pdf");
			});
	};

	const onSubmit = (data) => {
		const billItems = JSON.parse(localStorage.getItem("billDocs"));

		if (!billItems) {
			setBillItems([data]);
		}
		if (billItems) {
			let index = null;
			const itemExist = billItems.find((item, i) => {
				if (item.docName === data.docName) index = i;
				return item.docName === data.docName;
			});
			if (!itemExist) {
				billItems.push(data);
				setBillItems(billItems);
			}
			if (itemExist) {
				billItems[index] = data;

				setBillItems(billItems);
				console.log("item updated");
			}
		}
	};

	const addService = () => {
		append({ title: "XXX XXXXXXXX XXXXXXXXX", price: 0, quantity: 0, sum: 0 });
	};
	return (
		<div>
			<div css={styles.save}>
				<BaseInput register={register} inputName="docName" width="200" />
				<div css={styles.saveButtons}>
					<Button
						onClick={generatePDF}
						type="button"
						classname={styles.saveButton}
						classnameContainer={styles.exportButton}
					>
						Експортувати у PDF
					</Button>
					<Button
						classname={styles.saveButton}
						classnameContainer={styles.saveButtonContainer}
						type="submit"
						form="billDoc"
					>
						Зберегти
					</Button>
				</div>
			</div>
			<form css={styles.billDoc} onSubmit={handleSubmit(onSubmit)} id="billDoc">
				<div css={styles.title}>
					<span>Рахунок-фактура №22-</span>
					<BaseInput
						register={register}
						inputName="billNumber"
						width="80"
						classname={styles.titleFieldBold}
					/>
					<span>від </span>
					<BaseDatePicker
						register={register}
						inputName="billDateFrom"
						classname={styles.titleFieldBold}
						dateFormat="dd.MM.yyyy"
					/>
				</div>
				<div css={styles.infoContainer}>
					<div css={styles.info}>
						<div css={styles.infoTitle}>
							<span>Постачальник</span>
						</div>
						<div css={styles.infoContent}>
							<div css={styles.infoTitleInput}>
								<BaseInput
									register={register}
									inputName="info.provider.title"
									width="250"
									classname={styles.fieldBold}
								/>
							</div>
							<TextAria
								register={register}
								inputName="info.provider.textField"
								width="200"
								height="70"
							/>
						</div>
					</div>
					<div css={styles.info}>
						<div css={styles.infoTitle}>
							<span>Покупець</span>
						</div>
						<div css={styles.infoContent}>
							<TextAria
								register={register}
								inputName="info.buyer.textField"
								width="200"
								height="50s"
							/>
						</div>
					</div>
				</div>
				<div css={styles.basis}>
					<span>Підстава:</span>
					<div css={styles.details}>
						<div css={styles.fieldBold}>№</div>
						<div css={styles.fieldBold}>Найменування</div>
						<div css={styles.fieldBold}>Од. вим.</div>
						<div css={styles.fieldBold}>Кількість</div>
						<div css={styles.fieldBold}>Ціна, грн.</div>
						<div css={styles.fieldBold}>Сума, грн.</div>
					</div>

					{formValues.details.map((item, index) => (
						<div key={index} css={styles.details}>
							<div css={styles.fieldBold}>{index + 1}</div>
							<div>
								<BaseInput
									register={register}
									inputName={`details[${index}].title`}
									width="210"
									classname={styles.fieldBold}
								/>
							</div>
							<div css={styles.fieldBold}>Година</div>
							<div>
								<BaseInput
									register={register}
									inputName={`details[${index}].quantity`}
									width="70"
									classname={styles.fieldBold}
									onChange={(e) => {
										handleTimeChange(e);
										setValue(
											`details.${index}.sum`,
											(
												Number(formValues.details.index.quantity) *
												convertStrTimeToNum(e.target.value)
											).toFixed(2)
										);
									}}
								/>
							</div>
							<div>
								<BaseInput
									register={register}
									inputName={`details[${index}].price`}
									width="70"
									classname={styles.fieldBold}
									onChange={(e) => {
										handleTimeChange(e);
										setValue(
											`details.${index}.sum`,
											(
												Number(formValues.details.index.price) *
												Number(e.target.value)
											).toFixed(2)
										);
									}}
								/>
							</div>
							<div>
								<BaseInput
									register={register}
									inputName={`details[${index}].sum`}
									width="80"
									readOnly={true}
									classname={styles.fieldBold}
								/>
							</div>
							<button
								onClick={() => remove(index)}
								css={styles.detailsRemoveBtn}
							>
								X
							</button>
						</div>
					))}
					<Button onClick={addService}>Додати сервіс</Button>
					<div css={styles.total}>
						<div>
							<span css={styles.fieldBold}>{orderTotal} грн.</span>
						</div>
						<div>
							<span css={styles.totalColumn}>ПДВ:</span>
							<span css={styles.fieldBold}>без ПДВ</span>
						</div>
					</div>
				</div>
				<div>
					<div css={styles.totalText}>
						<span>До сплати: 1000</span>

						<span>гривень</span>
						<BaseInput
							register={register}
							inputName="totalCents"
							width="10"
							classname={styles.fieldBold}
						/>
						<span>копійок, без ПДВ</span>
					</div>
				</div>

				<div css={styles.billAuthor}>
					<div css={styles.billAuthorTitle}>
						<span css={styles.fieldBold}>Рахунок виписав (ла)</span>
					</div>
					<BaseInput
						register={register}
						inputName="billAuthor"
						width="300"
						classname={styles.fieldBold}
					/>
				</div>
			</form>
		</div>
	);
}

BillDoc.propTypes = {
	selectedBill: PropTypes.object,
	setBillItems: PropTypes.func,
};
