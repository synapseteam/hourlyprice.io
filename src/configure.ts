import * as yup from "yup";

import { SEC_IN_MINUTE, MIN_STORE_CACHE } from "utils/constants";
import { ICurrency, IOption } from "typescript/interfaces";

export const formSchema = yup.object().shape({
  price: yup.number().positive().required(),
  time: yup.string().required(),
  currency: yup.string().required().oneOf(["USD", "UAH", "EUR"]),
});

//limit frame for updating rates using API. If user made new request within specified timeframe (in seconds) data will requested from state, state not updated using API/
export const ratesUpdatingTimeFrame = SEC_IN_MINUTE * MIN_STORE_CACHE;

export const ratesSources: IOption[] = [
  { value: "masterCard", name: "MasterCard" },
  { value: "manual", name: "Manual" },
];

export const currenciesSymbols: ICurrency[] = [
  { name: "USD", symbol: "$" },
  { name: "EUR", symbol: "€" },
  { name: "UAH", symbol: "₴" },
];

export const INVOICE_PREVIEW_SUPPORTED_RESOLUTION = 921;
